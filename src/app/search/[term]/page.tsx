import db from "@/utils/db";
import { Movie } from "../../../../types";
import MoviePoster from "@/components/MoviePoster/page";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "embedding-001", // Ensure embeddings match MongoDB dimensions
});

export async function embeddings(prompt: string) {
    const response = await model.embedContent(prompt);
    return response.embedding.values;
}

async function SearchTerm({ params }: { params: { term: string } }) {
    const { term } = params;

    try {
        const dbInstance = await db;
        const movieCollection = dbInstance
            .db("sample_mflix")
            .collection("embedded_movies");

        // Generate embeddings for the search term
        const queryVector = await embeddings(term);
        if (!queryVector) {
            throw new Error("Failed to generate embeddings for the search term.");
        }

        // Perform vector similarity search using MongoDB's $vectorSearch
        const similarMovies = await movieCollection
            .aggregate<Movie>([
                {
                    $vectorSearch: {
                        index: "vector_index", // Ensure this index exists in MongoDB Atlas
                        path: "embedded_movies", // ✅ Corrected field name
                        numCandidates: 25,
                        queryVector: queryVector,
                        limit: 10,
                    },
                },
                { $project: { plot_embedding: 0 } }, // Exclude embeddings from results
            ])
            .toArray();

        return (
            <div className="flex flex-col items-center justify-center p-20 pt-10">
                <h1 className="mb-10 text-xl text-gray-100">
                    Suggested results based on "{term}"
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {similarMovies.map((movie, i) => {
                        console.log(movie); // ✅ Log outside JSX
                        return (
                            <div key={movie?._id} className="flex space-x-2 relative">
                                <p className="absolute flex items-center justify-center left-4 top-2 text-white font-extrabold text-xl z-40 rounded-full bg-indigo-500/80 w-10 h-10">
                                    {i + 1}
                                </p>
                                <MoviePoster movie={movie} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in SearchTerm:", error);
        return (
            <div className="flex flex-col items-center justify-center p-20 pt-10">
                <h1 className="text-xl text-red-500">
                    An error occurred while fetching similar movies.
                </h1>
                <p className="text-gray-100">
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            </div>
        );
    }
}

export default SearchTerm;

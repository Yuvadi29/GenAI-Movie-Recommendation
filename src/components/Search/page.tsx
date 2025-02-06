import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { BiHome } from 'react-icons/bi';

const Search = () => {

    async function search(formData: FormData) {
        "use server";

        // Performing Server Actions
        const searchTerm = formData.get("searchTerm") as string;

        redirect(`/search/${searchTerm}`);
    }

    return (
        <form action={search} className="w-full flex items-center px-5 rounded-full border-white bg-white border shadow-lg"
        >
            <Link href="/">
                <p className='text-gray-300'><BiHome size={30}/></p>
            </Link>

            <input
                type="text"
                name="searchTerm"
                className='flex-1 p-5 outline-none'
                placeholder="What type of film do you like? e.g. Sci-Fi films in space..."
            />
        </form>
    )
}

export default Search
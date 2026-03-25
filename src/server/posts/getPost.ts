import { db } from "#/database";
import { posts } from "#/database/schema";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";


export const fetchPosts = createServerFn({method: 'GET'})
.handler(async () => {
    const response = await db.select().from(posts).orderBy(posts.createdAt).execute();
    console.log("Fetched posts:", response);

    return response
})

export const postsQueryOptions = () => {
    return queryOptions({
        queryKey: ['posts'],
        queryFn: () => fetchPosts()
    })
}
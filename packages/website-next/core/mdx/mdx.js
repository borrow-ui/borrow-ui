import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export function generateGetStaticPaths(sourcePaths) {
    /**
     * Get all the sources given a folder.
     */
    return async () => {
        const paths = getAllSources([sourcePaths]).map(({ slug }) => ({
            params: { slug },
        }));

        return {
            paths,
            fallback: false,
        };
    };
}

export function generateGetStaticProps(sourcePaths) {
    /**
     * Read the file based on the slug and the folder and returns the full content.
     * If a slug is not available, uses `index`.
     */
    return async ({ params = {} }) => {
        const content = await getSingleContent(sourcePaths, params.slug || 'index');

        return {
            props: { ...content },
        };
    };
}

export const getSourceOfFile = (sourcePath, fileName) => {
    /**
     * Get the content of a file.
     */
    const fullPath = path.join(sourcePath, fileName);
    if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath);
    }
    throw new Error('Page source not found');
};

export const getAllSources = (sourcePaths) => {
    /**
     * Get the frontmatter of all the files inside a folder.
     * Decorates the result also with the original slug (file name)
     * and with the original folder.
     */
    let sources = [];
    for (const sourcePath of sourcePaths) {
        const pathSources = fs
            .readdirSync(sourcePath)
            .filter((path) => /\.mdx?$/.test(path))
            .map((fileName) => {
                const source = getSourceOfFile(sourcePath, fileName);
                const slug = fileName.replace(/\.mdx?$/, '');
                const { data } = matter(source);

                return {
                    metadata: data,
                    sourcePath,
                    slug,
                };
            });
        sources = [...sources, ...pathSources];
    }
    return sources;
};

export const getSingleContent = async (sourcePath, slug) => {
    /**
     * Get the full content of a file, divided into metadata
     * and code (the actual MDX content).
     */
    const source = getSourceOfFile(sourcePath, slug + '.mdx');

    const { content, data } = matter(source);
    const code = await serialize(content);
    return {
        metadata: data,
        code,
    };
};

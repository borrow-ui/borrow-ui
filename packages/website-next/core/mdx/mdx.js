import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export const getSourceOfFile = (sourcePath, fileName) => {
    const fullPath = path.join(sourcePath, fileName);
    if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath);
    }
    throw new Error('Page source not found');
};

export const getAllSources = (sourcePaths) => {
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
    const source = getSourceOfFile(sourcePath, slug + '.mdx');

    const { content, data } = matter(source);
    const code = await serialize(content);
    return {
        metadata: data,
        code,
    };
};

export function generateGetStaticProps(sourcePaths) {
    return async ({ params = {} }) => {
        const content = await getSingleContent(sourcePaths, params.slug || 'index');

        return {
            props: { ...content },
        };
    };
}

export function generateGetStaticPaths(sourcePaths) {
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

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Soft pastels for topics
                'topic-1': '#E0F2F1', // Teal 50
                'topic-2': '#F3E5F5', // Purple 50
                'topic-3': '#E8EAF6', // Indigo 50
                'topic-4': '#FFF3E0', // Orange 50
                'topic-5': '#FCE4EC', // Pink 50
                'topic-6': '#E1F5FE', // Light Blue 50
                // Neutral backgrounds
                'neutral-bg': '#FAFAFA',
                'card-bg': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

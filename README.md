# My Personal Website

This repository contains the source code for my personal website.

[https://yusufdemir.netlify.app/](https://yusufdemir.netlify.app/)

<img width="1491" height="859" alt="image" src="https://github.com/user-attachments/assets/77a974fb-e3ab-4786-b56f-99f230b81490" />

## Technologies Used

- [Next.js](https://nextjs.org/) – React framework for production
- [React](https://reactjs.org/) – Library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework

## Features

- Responsive and modern design
- Built with TypeScript and Tailwind CSS
- Optimized for performance and accessibility
- Easy to maintain and extend
- Static site generation (SSG) for optimal performance
- Dockerized for easy deployment
- **Automated CV updates from LaTeX source** – Update your CV data by simply editing the LaTeX file and running a single command

## Deployment

This site is deployed on [Netlify](https://yusufdemir.netlify.app/).

## Updating Your CV

This website includes an automated CV update system. To update your CV:

1. Edit your CV in LaTeX format at `src/data/` directory
   - Name your file as `cv.txt` or `*_cv.txt` (e.g., `john_cv.txt`, `jane_cv.txt`)
   - The script will automatically detect any file matching this pattern
   - **Note**: The parser is optimized for [RenderCV](https://github.com/sinaatalay/rendercv)-generated LaTeX files
2. Run the update script:

   ```bash
   npm run update-cv
   ```

This will automatically parse your LaTeX CV and update the `src/data/cv.ts` file with the latest information, including:
- Personal information (name, email, location, etc.)
- Education details
- Work experience
- Volunteering activities
- Projects
- Skills and competencies

**For detailed information about parser compatibility and limitations**, see [CV Parser Guide](docs/CV_PARSER_GUIDE.md).


## Running Locally

To set up and run the project on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yusufdemrr/presonalWebsite.git
   cd personalWebsite
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

## Running with Docker

To build and run the app using Docker:

1. Build and start the container:

   ```bash
   docker-compose up --build
   ```

2. Visit [http://localhost:3000](http://localhost:3000) in your browser.

# LiteCode AI

## Overview

Welcome to LiteCode AI! This web application is designed for coders and developers who want to optimize their code and receive detailed explanations. LiteCode AI also generates interview questions and answers based on the provided code. We utilize Google's Gemini AI API to analyze and enhance your code.

**Live Link:** [LiteCode AI](https://litecode-ai.vercel.app/)

## Features

- **Code Optimization:** Paste your code and receive a more optimized, minimal version.
- **Code Explanation:** Get detailed explanations for the optimized code.
- **Interview Questions:** Generate relevant interview questions and answers from the provided code.

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind
- **API:**
  - Google's Gemini AI API
- **Hosting:**
  - Vercel

## Installation

To view and run LiteCode AI locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/RajMarkana/LiteCode.git
    ```

2. Navigate to the project directory:
    ```bash
    cd LiteCode
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your Google Gemini AI API key:
    ```env
    GEMINI_API_KEY=your_api_key
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:5173` to use LiteCode AI.

## Usage

1. Paste your code into the input field on the home page.
2. Click the "Optimize" button to receive the optimized code.
3. View the detailed explanation for the optimized code.
4. Generate interview questions and answers by clicking the "Generate Questions" button.

## Future Enhancements

We plan to further improve LiteCode AI with the following features:

- **Code Snippets:** Allow users to save and share code snippets.
- **Language Support:** Expand support for more programming languages.
- **User Authentication:** Implement user accounts for personalized experiences.


## Acknowledgments

We would like to thank Google's Gemini AI for providing the API that powers this application. We also appreciate the support from our mentors, peers, and the open-source community.

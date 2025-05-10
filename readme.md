# Supabase Authentication Starter

This repository provides a ready-to-use authentication system integrated with **Supabase** to speed up your development process when building applications with user authentication. It includes password-based authentication and social login (Google), allowing developers to quickly implement secure user management and authentication.

## Features

- **Password Authentication**: Allows users to sign up and log in using email and password.
- **Google OAuth Login**: Provides users the ability to authenticate via Google.
- **Email Verification**: Sends confirmation emails to verify user accounts.
- **Error Handling**: Handles various common errors during authentication.
- **Responsive UI Components**: Utilizes Tailwind CSS for responsive, clean UI components.
- **Supabase Integration**: Integrates Supabase's authentication APIs and storage services.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Folder Structure](#folder-structure)
5. [Code Walkthrough](#code-walkthrough)
6. [Contributing](#contributing)
7. [License](#license)

---

## Prerequisites

To get started with this repository, you’ll need the following:

- **Node.js** (>= 14.x)
- **Expo CLI** (for React Native projects)
- **Supabase account**: Sign up [here](https://supabase.com).
- **Tailwind CSS / NativeWind** (for styling)
- **Google Cloud project** (for OAuth integration)

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/supabase-authentication-starter.git
    cd supabase-authentication-starter
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up Supabase:
    - Go to [Supabase](https://supabase.com), create a project, and obtain your Supabase URL and API Key.
    - In your project, create a `.env` file and add the following environment variables:
      ```env
      SUPABASE_URL=your-supabase-url
      SUPABASE_API_KEY=your-supabase-api-key
      ```

4. Set up Google OAuth:
    - Go to the [Google Developer Console](https://console.developers.google.com/), create a new project, and enable the "Google Identity" API.
    - Set up OAuth credentials and configure your redirect URIs.

5. Run your project:
    ```bash
    expo start
    ```

---

## Usage

After installation, you can start using the components for authentication in your project.

### Sign Up Flow
The sign-up form allows users to register with email and password. After registering, users are prompted to verify their email through the confirmation email sent by Supabase.

```tsx
import { supabase } from '../../lib/supabase';

// Create a new user
const { error } = await supabase.auth.signUp({ email, password });
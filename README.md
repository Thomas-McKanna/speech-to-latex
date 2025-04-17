# Speech to LaTeX

<!-- Demo video will go here -->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with WebLLM](https://img.shields.io/badge/Built%20with-WebLLM-blue)](https://github.com/mlc-ai/web-llm)
[![Powered by Whisper](https://img.shields.io/badge/Powered%20by-Whisper-orange)](https://github.com/xenova/whisper-web)
[![Rendered with MathJax](https://img.shields.io/badge/Rendered%20with-MathJax-green)](https://www.mathjax.org/)

## [🚀 Try it now!](https://your-deployment-url.com)

## Overview

Speech to LaTeX is a powerful web application that converts spoken mathematics into LaTeX expressions, running entirely in your browser. No server required! Simply speak your mathematical expressions, and watch as they're transformed into beautifully formatted LaTeX.

## Features

- 🎤 **Voice to LaTeX** - Dictate mathematical expressions naturally
- 💻 **100% Client-side** - All processing happens in your browser
- 🔒 **Privacy-focused** - No data leaves your device
- 🌐 **Works offline** - Once loaded, no internet connection needed
- ⚡ **Real-time conversion** - See results as you speak
- 🎛️ **Customizable models** - Choose from different Whisper and LLM models

## How It Works

Speech to LaTeX combines three powerful technologies:

1. **[Whisper Web](https://github.com/xenova/whisper-web)** - Transcribes your speech to text
2. **[WebLLM](https://github.com/mlc-ai/web-llm)** - Converts transcribed text to LaTeX expressions
3. **[MathJax](https://www.mathjax.org/)** - Renders LaTeX expressions beautifully in the browser

## Getting Started

1. Visit the [Speech to LaTeX app](https://your-deployment-url.com)
2. Allow microphone access when prompted
3. Click the microphone button and start speaking your mathematical expression
4. Watch as your speech is converted to LaTeX in real-time
5. Copy the generated LaTeX code or view the rendered expression

## Example Expressions

Try saying:
- "The quadratic formula is x equals negative b plus or minus the square root of b squared minus 4ac all over 2a"
- "The integral from 0 to infinity of e to the negative x squared dx equals square root of pi over 2"
- "The sum from n equals 1 to infinity of 1 over n squared equals pi squared over 6"

## Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/speech-to-latex.git

# Navigate to the project directory
cd speech-to-latex

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

This project wouldn't be possible without these amazing open-source projects:

- [WebLLM](https://github.com/mlc-ai/web-llm) - For running LLMs directly in the browser
- [Whisper Web](https://github.com/xenova/whisper-web) - For browser-based speech recognition
- [MathJax](https://www.mathjax.org/) - For rendering LaTeX expressions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

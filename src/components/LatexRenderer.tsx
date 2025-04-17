import { FC } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  chtml: {
    scale: 2.0,
  },
};

interface LatexRendererProps {
  latex: string;
}

const LatexRenderer: FC<LatexRendererProps> = ({ latex }) => {
  if (!latex) return null;

  try {
    // Extract the LaTeX content from any delimiters
    let cleanLatex = latex;

    // Remove any existing delimiters
    cleanLatex = cleanLatex
      .replace(/^\\\(|\\\)$/g, "") // Remove inline delimiters \( \)
      .replace(/^\\\[|\\\]$/g, "") // Remove display delimiters \[ \]
      .replace(/^\$|\$$/g, "") // Remove $ delimiters
      .replace(/^\$\$|\$\$$/g, "") // Remove $$ delimiters
      .trim();

    // Format with proper delimiters for MathJax - always use inline mode
    const formattedLatex = `$${cleanLatex}$`;

    return (
      <div className="w-full">
        <MathJaxContext version={3} config={config}>
          <MathJax hideUntilTypeset="first" dynamic inline>
            {formattedLatex}
          </MathJax>
        </MathJaxContext>
      </div>
    );
  } catch (error) {
    console.error("Error rendering LaTeX:", error);
    return (
      <div className="text-red-500">
        Error rendering LaTeX: {(error as Error).message}
      </div>
    );
  }
};

export default LatexRenderer;

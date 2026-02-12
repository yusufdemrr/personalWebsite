# CV Parser - Supported Formats & Limitations

## Current Parser Capabilities

The CV parser is designed to work with **RenderCV-style LaTeX CVs** and has the following requirements:

### ✅ Supported Features

1. **Personal Information**
   - Name: `\fontsize{25 pt}{25 pt}\selectfont Your Name`
   - Email: `\hrefWithoutArrow{mailto:email@example.com}`
   - Location: `\mbox{City, Country}`
   - LinkedIn: `\hrefWithoutArrow{https://www.linkedin.com/in/username}`
   - GitHub: `\hrefWithoutArrow{https://github.com/username}`

2. **Sections** (must use exact names)
   - `\section{Education}`
   - `\section{Experience}`
   - `\section{Volunteering}`
   - `\section{Projects}`
   - `\section{Skills And Competences}`

3. **Entry Structures**
   - Two-column entries: `\begin{twocolentry}{period}...\end{twocolentry}`
   - Highlights: `\begin{highlights}...\item description\end{highlights}`

### ❌ Current Limitations

1. **Section Names**: Must match exactly (case-sensitive)
   - ❌ Won't work: `\section{Work Experience}`, `\section{EXPERIENCE}`
   - ✅ Works: `\section{Experience}`

2. **Section Order**: Expects sections in specific order
   - Education → Experience → Volunteering → Projects → Skills

3. **LaTeX Environments**: Requires specific RenderCV-style environments
   - `twocolentry`, `highlights`, `onecolentry`

4. **Skills Format**: Expects specific format
   - `\textbf{Languages:} Python, Java, C++`
   - `\textbf{Frameworks/Libraries:} React, Django`
   - `\textbf{Tools \& Platforms:} Git, Docker`

### 🔧 Making Your CV Compatible

If your CV doesn't work with the parser, you have two options:

#### Option 1: Adapt Your CV (Recommended)
Use [RenderCV](https://github.com/sinaatalay/rendercv) to generate a compatible LaTeX CV:
```bash
pip install rendercv
rendercv new "Your Name"
# Edit the generated YAML file
rendercv render your_cv.yaml
```

#### Option 2: Customize the Parser
Edit `scripts/update-cv-from-latex.ts` to match your CV's structure:
- Update section name regex patterns
- Modify entry parsing logic
- Adjust field extraction patterns

### 📝 Example Compatible CV Structure

```latex
\section{Experience}

\begin{twocolentry}{
    June 2023 - Present
}
    \textbf{Software Engineer}, Company Name, Location
\end{twocolentry}

\vspace{0.10 cm}
\begin{onecolentry}
    \begin{highlights}
        \item Developed feature X using technology Y
        \item Improved performance by Z%
    \end{highlights}
\end{onecolentry}
```

### 🚀 Future Improvements

To make the parser more robust, consider:
1. **Flexible Section Names**: Use fuzzy matching or aliases
2. **Multiple CV Formats**: Support different LaTeX templates
3. **YAML/JSON Input**: Parse from RenderCV YAML directly
4. **Error Recovery**: Better handling of missing or malformed sections
5. **Validation**: Check parsed data completeness

---

**Note**: This parser is optimized for RenderCV-generated LaTeX files. For best results, use RenderCV to create your CV.

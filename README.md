# Markdown Notes

A React.js web application for creating, editing, and organizing notes in
Markdown.

<table align="center">
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/eliucs/markdown-notes/master/docs/readme-gif-1.gif" width="400px" alt="Markdown Notes GIF 1" title="Markdown Notes GIF 1">
        </td>
        <td>
            <img src="https://raw.githubusercontent.com/eliucs/markdown-notes/master/docs/readme-gif-2.gif" width="400px" alt="Markdown Notes GIF 2" title="Markdown Notes GIF 2">
        </td>
    </tr>
</table>

## Features

- Material Design UI
- Live editor previews
- Dynamic Latex rendering
- Autosave
- Customization
- Export to PDF

## Usage

Before you start, run:

```
yarn run build:prod
```

Then run:

```
yarn run start
```

And your Markdown notes server will be ready to use at port 5000. The actual files, and file index 
will be saved to a directory called `user-data`. Exported PDFs are saved in a temp directory called
`temp`.

## Testing/Dev

Uses `webpack`, `babel` to transpile the JSX to regular JavaScript, `webpack-live-server` and 
`nodemon` for automatic reloading of client and server. In the terminal, run:

```
yarn run dev
```

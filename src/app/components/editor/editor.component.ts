import { Component, AfterViewInit } from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css'; // Tema oscuro
import 'codemirror/addon/edit/closebrackets';  // Importar el addon

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements AfterViewInit {
  currentLanguage: string = 'html';
  code: any = {
    html: '<h1>Hello World</h1>',
    css: 'body { background: lightblue; }',
    javascript: 'console.log("Hello from JavaScript!");',
  };
  editorInstance: any;

  ngAfterViewInit() {
    this.initializeEditor();
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.editorInstance.setValue(this.code[this.currentLanguage]);
    this.editorInstance.setOption('mode', this.getMode(this.currentLanguage));
  }

  initializeEditor() {
    this.editorInstance = CodeMirror.fromTextArea(
      document.getElementById('code-editor') as HTMLTextAreaElement,
      {
        mode: this.getMode(this.currentLanguage),
        theme: 'dracula',
        lineNumbers: true,
        tabSize: 2,
        autoCloseBrackets: true,
      }
    );
    this.editorInstance.setValue(this.code[this.currentLanguage]);

    this.editorInstance.on('change', () => {
      this.code[this.currentLanguage] = this.editorInstance.getValue();
    });
  }

  runCode() {
    const previewFrame = document.getElementById('previewFrame') as HTMLIFrameElement;
    const htmlContent = `
      <html>
        <head>
          <style>${this.code.css}</style>
        </head>
        <body>
          ${this.code.html}
          <script>${this.code.javascript}<\/script>
        </body>
      </html>
    `;
    previewFrame.srcdoc = htmlContent;
  }

  getMode(language: string): string {
    switch (language) {
      case 'html':
        return 'htmlmixed';
      case 'css':
        return 'css';
      case 'javascript':
        return 'javascript';
      default:
        return 'text/plain';
    }
  }
}

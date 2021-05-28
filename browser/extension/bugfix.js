import extension from 'extensionizer';

extension.runtime.getPlatformInfo(info => {
  if (info.os === 'mac') {
    const fontFaceSheet = new CSSStyleSheet();
    fontFaceSheet.insertRule(`
      @keyframes redraw {
        0% {
        opacity: 1;
        }
        100% {
        opacity: .99;
        }
      }
    `);
    fontFaceSheet.insertRule(`
      html {
        animation: redraw 1s linear infinite;
      }
    `);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontFaceSheet];
  }
});

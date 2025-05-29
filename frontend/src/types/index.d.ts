declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

interface Window {
  env: {
    REACT_APP_API_URL: string;
  };
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
  }
} 
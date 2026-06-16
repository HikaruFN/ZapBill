/// <reference types="vite/client" />

import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        location?: string;
        'project-id'?: string;
        'agent-id'?: string;
        'language-code'?: string;
        'max-query-length'?: string | number;
        intent?: string;
        expand?: string;
      }, HTMLElement>;
      'df-messenger-chat': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'chat-title'?: string;
      }, HTMLElement>;
      'df-messenger-chat-bubble': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'chat-title'?: string;
      }, HTMLElement>;
    }
  }
}

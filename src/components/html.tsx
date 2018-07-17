import React from 'react';

export function Html(children) {
  // TODO: doctype, <!--[if gte mso 9]>
  return (
    <>
      <html>
        <head>
          <meta charSet="UTF-8" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}

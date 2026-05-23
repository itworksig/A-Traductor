"use strict";

(function () {
  if (typeof XMLHttpRequest === "undefined" && typeof fetch === "function") {
    class FetchXMLHttpRequest {
      constructor() {
        this.headers = {};
        this.responseType = "";
        this.response = null;
        this.responseText = "";
        this.status = 0;
        this.statusText = "";
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        this.ontimeout = null;
      }

      open(method, url) {
        this.method = method;
        this.url = url;
      }

      setRequestHeader(name, value) {
        this.headers[name] = value;
      }

      async send(body = null) {
        try {
          const response = await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body,
          });
          this.status = response.status;
          this.statusText = response.statusText;

          if (this.responseType === "json") {
            this.response = await response.json();
          } else if (this.responseType === "blob") {
            this.response = await response.blob();
          } else if (this.responseType === "arraybuffer") {
            this.response = await response.arrayBuffer();
          } else {
            this.responseText = await response.text();
            this.response = this.responseText;
          }

          if (typeof this.onload === "function") {
            this.onload({ target: this });
          }
        } catch (error) {
          if (typeof this.onerror === "function") {
            this.onerror(error);
          }
        }
      }

      abort() {
        if (typeof this.onabort === "function") {
          this.onabort();
        }
      }
    }

    globalThis.XMLHttpRequest = FetchXMLHttpRequest;
  }

  if (typeof FileReader === "undefined") {
    class BlobFileReader {
      constructor() {
        this.result = null;
        this.onloadend = null;
        this.onerror = null;
      }

      async readAsDataURL(blob) {
        try {
          const buffer = await blob.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let binary = "";
          bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
          });
          this.result = `data:${blob.type || "application/octet-stream"};base64,${btoa(binary)}`;
          if (typeof this.onloadend === "function") {
            this.onloadend();
          }
        } catch (error) {
          if (typeof this.onerror === "function") {
            this.onerror(error);
          }
        }
      }
    }

    globalThis.FileReader = BlobFileReader;
  }
})();

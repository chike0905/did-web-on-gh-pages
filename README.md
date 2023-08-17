# did:web on GitHub Pages
This implementation generates and publishes a did:web on GitHub Pages.
- https://w3c-ccg.github.io/did-method-web/

## Environment
- Node.js 18.17.1

## Usage
### Generate and Publish your DID Document
1. Fork and Clone this repository
2. Setup your config file (`./src/config.json`)
    ```
    {
      "DOMAIN": <YOUR-GITHUB-PAGES-DOMAIN>,
      "REPOSITORY": "did-web-on-gh-pages"
    }
    ```
3. Generate DID Document
    - **NOTE:** This command generates a private key in `keys/jwk.json.` **DO NOT SHARE OR PUBLISH PRIVATE KEY** 
    ```
    npm install
    npm run generate
    ```
4. Publish your GitHub pages with DID Document
      - commit and push the generated DID Document.
          ```
          git add ./docs/did.json
          git commit -m "generate did document"
          git push
          ```
      - Set up your GitHub page on GitHub to publish the `docs` directory of the main branch in this repository.
          - https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
     - Check your Github Pages are deployed.   
5. Resolve generated DID:web in Universal Resolver
     - https://dev.uniresolver.io/
  
### DEMO: generate jwt and verify with `did-jwt`
- After setting up and publishing your did document, you can run the demo.
  - It generates a jwt with the generated private key and verifies it by resolving the did of the issuer of the jwt. 
  ```
  npm run demo
  ```
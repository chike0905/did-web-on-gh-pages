# did:web on github pages
## Usage
### Generate and Publish your DID Document
1. Fork and Clone this repository
2. Setup your config file (`./src/config.json`)
  ```
  {
    "DOMAIN": <YOUR-GITHUB-PAGES-DOMAIN>,
    "GH_PROJECT": "did-web-on-gh-pages"
  }
  ```

3. Generate DID Document
  ```
  npm install
  npm run generate
  ```
4. Publish your github pages with DID Document
  - commit and push the generated DID Document.
      ```
      git add ./docs/did.json
      git commit -m "generate did document"
      git push
      ```
  - Setup github pages on GitHub so that publishes `docs` directory of main branch in this repository.
     - https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
  - Check Your Github Pages are deployed.  
5. Resolve generated DID:web in Universal Resolver
  - https://dev.uniresolver.io/
  
### DEMO: generate jwt and verify with `did-jwt`
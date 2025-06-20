<a name="readme-top"></a>

<p align="center"><a href="https://github.com/antoinebtn/ESGI-vuejs/graphs/contributors"><img src="https://img.shields.io/github/contributors/antoinebtn/ESGI-vuejs.svg?style=for-the-badge" alt="Contributors"></a>
        <a href="https://github.com/antoinebtn/ESGI-vuejs/network/members"><img src="https://img.shields.io/github/forks/antoinebtn/ESGI-vuejs.svg?style=for-the-badge" alt="Forks"></a>
        <a href="https://github.com/antoinebtn/ESGI-vuejs/stargazers"><img src="https://img.shields.io/github/stars/antoinebtn/ESGI-vuejs.svg?style=for-the-badge" alt="Stargazers"></a>
        <a href="https://github.com/antoinebtn/ESGI-vuejs/issues"><img src="https://img.shields.io/github/issues/antoinebtn/ESGI-vuejs.svg?style=for-the-badge" alt="Issues"></a></p><br/>

<div align="center">

# Bun Appetit

A website for orderinfg food online, built with Nuxtjs.

</div>

<div align="center"><h4><a href="#-about-the-project">ℹ️ About the Project</a> • <a href="#-stack-tech">🛠 Stack Tech</a> • <a href="#-setup">⚙ ️Setup</a> • <a href="#-contributing">👏🏻 Contributing</a> • <a href="#-about-the-author">👨🏻‍ About the Author</a> • <a href="#-license">📖 License</a></h4></div>

<!-- TABLE_CONTENT_PLACEHOLDER -->

## ℹ️ About the Project

This project is a food ordering website built with Nuxt.js. It allows users to browse a variety of food options, add items to their cart, and place orders online. The website is designed to be user-friendly and responsive, providing an optimal experience on both desktop and mobile devices.

## 🛠 Stack Tech

- [![VueJs][VusJs-badge]][VueJs-url] - A general-purpose programming language
- [![Express][Express-badge]][Express-url] - A web application framework for Node.js

[VusJs-badge]: https://img.shields.io/badge/vuejs-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white
[VueJs-url]: https://vuejs.org/
[Express-badge]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

## ⚙ ️Setup

### Installation
#### Database configuration
##### With docker 
```bash
git clone
docker compose up -d 
```
- Open localhost:8080
- import dump /api/migration/esgi_bun_appetit.sql in the base esgi_bun_appetit

##### Without docker
- Create a base esgi_bun_appetit in your DBMS
- Import dump /api/migration/esgi_bun_appetit.sql in the base esgi_bun_appetit

#### Launch Project 
```
cd /app
npm install
npm run dev

cd /api
npm install
npm run dev
```


## 👏🏻 Contributing

We welcome contributions from the community! If you would like to contribute to this project, please follow the guidelines below.

### Ways to Contribute

- Report bugs or issues by opening a new issue on our GitHub repository.
- Suggest new features or improvements by opening a new issue on our GitHub repository.
- Contribute code by forking the repository, making changes, and submitting a pull request.

### Contribution Instructions

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature-branch`.
3. Make the necessary changes and commit them: `git commit -am 'Add my new feature'`.
4. Push your branch to your forked repository: `git push origin my-feature-branch`.
5. Open a pull request against the main repository, describing the changes you made and why they should be merged.

### Contributors

<a href="https://github.com/antoinebtn/ESGI-vuejs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=antoinebtn/ESGI-vuejs" />
</a>


## 📖 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

<p align="right"><a href="#readme-top">Top ⬆️</a></p>

#!/usr/bin/env bash

# Exit script if you try to use an uninitialized variable.
set -o nounset

# Exit script if a statement returns a non-true return value.
set -o errexit

# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

# Set gitconfig
git config --global user.email ${GITHUB_EMAIL}
git config --global user.name ${GITHUB_NAME}

# Clone master branch
git clone ${CIRCLE_REPOSITORY_URL} out
cd out
git checkout ${TARGET_BRANCH} || git checkout --orphan ${TARGET_BRANCH}
git rm -rf .
cd ..

# Build vuepress docs
yarn global add vuepress
yarn docs:build
cp -a public/. out/.
mkdir -p out/.circleci && cp -a .circleci/. out/.circleci/.

# Deploy docs to gh-pages branch
cd out
git add -A
git commit -m "Automated deployment to GitHub Pages" --allow-empty
git push origin ${TARGET_BRANCH}

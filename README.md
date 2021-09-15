# DeliveryHR

A holiday request tool

## Usage

Easily manage your squads holiday requests by using DeliveryHR.

### Key features

- Secure login with user roles
- Squad Members
  - Request holidays
  - View the status of holiday requests
- Squad leads
  - Manage all holiday requests
  - See all holidays requests

---

## To run the app locally

<br>

Clone the DeliveryHR repo

```bash
$ git clone https://github.com/Ramsey-cinch/DeliveryHR.git
```

Install app dependencies

```bash
$ yarn install
```

Install firebase dependencies

```bash
$ cd functions && yarn install
```

---

### Deploying to firebase

First you will have to set up and app within firebase, this is really easy to do, just follow [this guide](https://firebase.google.com/docs/hosting/quickstart)

Once setup on firebase you can login via the CLI

```bash
$ firebase login
```

To deploy the site to firebase hosting run these commands

This command will build the production version of the app and export it ready to be hosted as a static site

```bash
$ yarn build && yarn next export
```

This command will then deploy your static site to firebase

```bash
$ firebase deploy
```

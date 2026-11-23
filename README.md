# Animal picture picker

A one-page site where you pick an animal and get a random photo of it.

Alisa made this while trying out Cursor.

## How to use it

1. Choose cat, dog, fox, or duck.
2. Press **Confirm**.
3. Press **Confirm** again for another photo of the same animal.

If you confirm before choosing, the page asks you to pick an animal and does not call an API. If a request fails, the message says so and the previous photo stays.

![The animal picker showing a random photo](screenshot.png)

## How it works

The page calls free public APIs from the browser. There is no account, no API key, and no server of our own.

- **Cat** uses [The Cat API](https://thecatapi.com/). The page reads the picture link from the response.
- **Dog** uses [Dog CEO](https://dog.ceo/dog-api/). The page reads the picture link from the response.
- **Fox** uses [RandomFox](https://randomfox.ca/). The page reads the picture link from the response.
- **Duck** uses the image address from [random-d.uk](https://random-d.uk/) directly. That API’s data endpoint cannot be read from a web page, and the links it returns are not secure, so the page requests the image itself and adds a changing query so the browser does not reuse the last photo.

## Open it on your computer

From this folder, start a small local server and open the page in a browser:

```bash
python3 -m http.server 8765
```

Then go to [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

Opening `index.html` directly can block those API calls, so the local server is the reliable way to try it.

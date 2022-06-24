const generateLink = (value: string) => {
  return new Promise(function (resolve, reject) {
    fetch(
      "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA-kfMual2cl0xa7JMtW4WAZkEXr7l2iVo",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          dynamicLinkInfo: {
            domainUriPrefix: "https://choozmenu.com/menu",
            link: `https://choozmenu.com/RestaurantScreen/?id=${value}`,
            androidInfo: {
              androidPackageName: "com.chooz.choozmobile",
              androidFallbackLink: `https://m.choozmenu.com/welcome/${value}`,
            },
            iosInfo: {
              iosBundleId: "com.chooz.choozmobile",
              iosFallbackLink: `https://m.choozmenu.com/welcome/${value}`,
              iosAppStoreId: "1630258641",
            },
          },
        }),
      }
    ).then((response) => {
      console.log(response);
      console.log(response.url);
      response.json().then((json) => {
        resolve(json.shortLink);
      });
    });
  });
};

export default generateLink;

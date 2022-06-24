const generateLink = (restaurantKey: string) => {
  return new Promise<string>(function (resolve, reject) {
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
            link: `https://choozmenu.com/RestaurantScreen/?id=${restaurantKey}`,
            androidInfo: {
              androidPackageName: "com.chooz.choozmobile",
              androidFallbackLink: `https://m.choozmenu.com/welcome/${restaurantKey}`,
            },
            iosInfo: {
              iosBundleId: "com.chooz.choozmobile",
              iosFallbackLink: `https://m.choozmenu.com/welcome/${restaurantKey}`,
              iosAppStoreId: "1630258641",
            },
          },
        }),
      }
    ).then((response) => {
      response.json().then((json) => {
        resolve(json.shortLink);
      });
    });
  });
};

export default generateLink;

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
            domainUriPrefix: "https://choozmenu.com/mobile",
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
            navigationInfo: {
              enableForcedRedirect: true,
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

export const generateLongLink = (restaurantKey: string) => {
  return new Promise<string>(function (resolve, reject) {
    const domainUriPrefix = "https://choozmenu.com/mobile/";
    const link =
      "https://choozmenu.com/RestaurantScreen/?id%3D" + restaurantKey;
    const androidPackageName = "com.chooz.choozmobile";
    const androidFallbackLink =
      "https://m.choozmenu.com/welcome/" + restaurantKey;
    const iosAppStoreId = "1630258641";
    const iosBundleId = "com.chooz.choozmobile";
    const iosFallbackLink = "https://m.choozmenu.com/welcome/" + restaurantKey;

    const longDynamicLink =
      domainUriPrefix +
      "?link=" +
      link +
      "&apn=" +
      androidPackageName +
      "&afl=" +
      androidFallbackLink +
      "&isi=" +
      iosAppStoreId +
      "&ibi=" +
      iosBundleId +
      "&ifl=" +
      iosFallbackLink +
      "&efr=1";

    console.log(longDynamicLink);
    resolve(longDynamicLink);
  });
};

export default generateLink;

import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Alert, Fade, Avatar } from "@mui/material";
import {
  deleteBannerAndLogoImage,
  getRestaurantKey,
  pullBannerImageByUser,
  pullLogoImageByUser,
  pushBannerImage,
  pushLogoImage,
} from "../../firebase/databaseAPI/RestaurantApi";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import UploadDeleteImageButtonWithDialog from "../buttons/UploadDeleteImageButtonWithDialog";
import { choozTheme } from "../../theme/theme";
import Logo from "../images/chooz_icons/logoGrey.png";

export const UploadImagePanel: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // String to set to file input key. Updating this will reset the file input
  const [bannerInputReset, setBannerInputReset] = useState("");
  const [logoInputReset, setLogoInputReset] = useState("");

  const [errorText, setErrorText] = useState("");

  const [bannerURL, setBannerURL] = useState("");
  const [logoURL, setLogoURL] = useState("");

  useEffect(() => {
    if (!isDeleted && auth !== null && auth.currentUser !== null) {
      pullBannerImageByUser(auth.currentUser.uid)
        .then((bannerURL) => {
          setBannerURL(bannerURL);
        })
        .catch((err) => {
          console.log(err);
        });
      pullLogoImageByUser(auth.currentUser.uid)
        .then((logoURL) => {
          setLogoURL(logoURL);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bannerURL, logoURL]);

  useEffect(() => {
    if (isUpdated && auth !== null && auth.currentUser !== null) {
      pullBannerImageByUser(auth.currentUser.uid)
        .then((bannerURL) => {
          setBannerURL(bannerURL);
        })
        .catch((err) => {
          console.log(err);
        });
      pullLogoImageByUser(auth.currentUser.uid)
        .then((logoURL) => {
          setLogoURL(logoURL);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isDeleted) {
      setBannerURL("");
      setLogoURL("");
    }
  });

  const onBannerImageChange = (event: any) => {
    setBannerImage(event.target.files[0]);
  };
  const onLogoImageChange = (event: any) => {
    setLogoImage(event.target.files[0]);
  };

  const handleDeleteAgreeClick = () => {
    if (auth !== null && auth.currentUser !== null) {
      deleteBannerAndLogoImage(auth.currentUser.uid).then(
        () => {
          setIsDeleted(true);
          setIsUpdated(false);
        },
        (err) => {
          setErrorText(err.message);
        }
      );
    }
    setBannerInputReset("deleting");
    setLogoInputReset("deleting");
  };
  const handleUploadAgreeClick = () => {
    if (auth !== null && auth.currentUser !== null) {
      let user = auth.currentUser;
      pushBannerImage(user.uid, bannerImage).then(
        () => {
          setIsUpdated(true);
          setIsDeleted(false);
        },
        (err) => {
          setErrorText(err.message);
        }
      );
      pushLogoImage(user.uid, logoImage).then(
        () => {
          setIsUpdated(true);
          setIsDeleted(false);
        },
        (err) => {
          setErrorText(err.message);
        }
      );
    }
    setBannerInputReset("uploading");
    setLogoInputReset("uploading");
  };

  return (
    <Box
      width="100%"
      height="auto"
      bgcolor="grey.200"
      sx={{ borderLeft: 1, borderColor: "grey.400" }}
    >
      <Fade in={true} exit={false} mountOnEnter unmountOnExit timeout={400}>
        <Box width="44%" height="140vh" bgcolor="white" paddingTop="1%">
          <Typography
            variant="h4"
            color="black"
            textAlign="left"
            sx={{ marginLeft: "4%", marginRight: "4%" }}
          >
            Upload Image
          </Typography>
          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 2,
              marginLeft: "4%",
              marginRight: "4%",
            }}
          />
          <Box sx={{ marginLeft: "4%", marginRight: "4%" }}>
            <Typography variant="h5">Preview</Typography>
            <Typography variant="h6" color="grey.500" sx={{ marginBottom: 2 }}>
              Ratio may differ depending on the screen. Please check the app or
              the mobile web preview to see the actual result.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" height="430">
            <Box display="flex" flexDirection="column" height="460">
              {bannerURL !== "" ? (
                <Box
                  height="360"
                  width="500"
                  bgcolor={choozTheme.palette.secondary.main}
                  component="img"
                  src={bannerURL}
                />
              ) : (
                <Box
                  height="360"
                  width="500"
                  bgcolor={choozTheme.palette.secondary.main}
                />
              )}
              <Avatar
                src={logoURL !== "" ? logoURL : Logo}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: choozTheme.palette.secondary.light,
                  marginLeft: 3,
                  bottom: 50,
                  border: 1,
                  borderColor: "grey.400",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              marginLeft: "4%",
              marginRight: "4%",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Upload Restaurant Banner Image
            </Typography>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={onBannerImageChange}
              key={bannerInputReset}
            />
          </Box>

          <Box
            sx={{
              marginTop: 3,
              marginLeft: "4%",
              marginRight: "4%",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Upload Restaurant Logo Image
            </Typography>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={onLogoImageChange}
              key={logoInputReset}
            />
          </Box>

          <Box marginTop={4} height={60}>
            <Fade
              in={isUpdated}
              mountOnEnter
              unmountOnExit
              timeout={1000}
              onEntering={() => {
                setTimeout(() => {
                  setIsUpdated(false);
                }, 2000);
              }}
            >
              <Alert
                severity="success"
                sx={{ maxHeight: 60, justifyContent: "center" }}
              >
                Success: The images were successfully updated!
              </Alert>
            </Fade>
            <Fade
              in={isDeleted}
              mountOnEnter
              unmountOnExit
              timeout={1000}
              onEntering={() => {
                setTimeout(() => {
                  setIsDeleted(false);
                }, 2000);
              }}
            >
              <Alert
                severity="success"
                sx={{ maxHeight: 60, justifyContent: "center" }}
              >
                Success: The images were successfully deleted!
              </Alert>
            </Fade>
            <Fade
              in={errorText !== ""}
              mountOnEnter
              unmountOnExit
              timeout={1000}
              onEntering={() => {
                setTimeout(() => {
                  setErrorText("");
                }, 2000);
              }}
            >
              <Alert
                severity="error"
                sx={{ maxHeight: 60, justifyContent: "center" }}
              >
                Error: {errorText}
              </Alert>
            </Fade>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            // marginTop={isUpdated || isDeleted ? 1 : 10}
            marginTop={4}
            marginRight="4%"
          >
            <UploadDeleteImageButtonWithDialog
              handleUploadAgreeClick={handleUploadAgreeClick}
              handleDeleteAgreeClick={handleDeleteAgreeClick}
            />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

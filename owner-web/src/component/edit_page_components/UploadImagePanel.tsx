import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar, Alert } from "@mui/material";
import EditProfileButtonWithDialog from "../buttons/EditProfileButtonWithDilogue";
import { Restaurant } from "../../firebase/databaseAPI/Restaurant";
import {
  deleteBannerAndLogoImage,
  pullBannerImage,
  pullLogoImage,
  pullRestaurantByUser,
  pushBannerImage,
  pushLogoImage,
  pushProfile,
} from "../../firebase/databaseAPI/RestaurantApi";
import {
  auth,
  currentUser,
} from "../../firebase/authentication/firebaseAuthentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { reload } from "firebase/auth";
import { choozTheme } from "../../pages/theme";
import UploadImageButtonWithDialog from "../buttons/UploadDeleteImageButtonWithDialog";
import UploadDeleteImageButtonWithDialog from "../buttons/UploadDeleteImageButtonWithDialog";

export const UploadImagePanel: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [errorText, setErrorText] = useState("");

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
  };

  return (
    <>
      <Box
        width="100%"
        height="auto"
        bgcolor="grey.200"
        sx={{ borderLeft: 1, borderColor: "grey.400" }}
      >
        {/* {!this.state.loading && <></>} */}
        <Box width="44%" height="100vh" bgcolor="white">
          <Box padding="4%">
            <Typography variant="h4" color="black" textAlign="left">
              Upload Image
            </Typography>
            <Divider />

            <Box
              sx={{
                marginTop: 3,
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Upload Restaurant Banner Image
              </Typography>
              <input
                type="file"
                accept=".jpg, .png"
                onChange={onBannerImageChange}
              />
            </Box>

            <Box
              sx={{
                marginTop: 3,
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Upload Restaurant Logo Image
              </Typography>
              <input
                type="file"
                accept=".jpg, .png"
                onChange={onLogoImageChange}
              />
            </Box>

            <Box marginTop="10%">
              {isUpdated && (
                <Alert
                  severity="success"
                  sx={{ maxHeight: 60, justifyContent: "center" }}
                >
                  Success: The images were successfully updated!
                </Alert>
              )}
              {isDeleted && (
                <Alert
                  severity="success"
                  sx={{ maxHeight: 60, justifyContent: "center" }}
                >
                  Success: The images were successfully deleted!
                </Alert>
              )}
              {errorText !== "" && (
                <Alert
                  severity="error"
                  sx={{ maxHeight: 60, justifyContent: "center" }}
                >
                  Error: {errorText}
                </Alert>
              )}
              <Box display="flex" justifyContent="flex-end" marginTop="3%">
                <UploadDeleteImageButtonWithDialog
                  handleUploadAgreeClick={handleUploadAgreeClick}
                  handleDeleteAgreeClick={handleDeleteAgreeClick}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

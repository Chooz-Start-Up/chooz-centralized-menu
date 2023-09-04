import React from "react";
import {
  Box,
  Divider,
  Fade,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@mui/material";

export const TutorialPanel: React.FC = () => {
  return (
    <Box
      width="100%"
      height="auto"
      bgcolor="grey.200"
      sx={{ borderLeft: 1, borderColor: "grey.400" }}
    >
      <Fade in={true} exit={false} mountOnEnter unmountOnExit timeout={400}>
        <Box
          padding="2%"
          width="60%"
          height="900vh"
          bgcolor="white"
          boxShadow={2}
        >
          <Typography variant="h4" textAlign="left">
            Tutorial
          </Typography>

          <Divider />

          <Typography variant="h6" textAlign="left" marginTop={1}>
            This page will cover all of the features that you can find on your
            Chooz Profile. Here, you'll find out the intended purpose of each of
            the features on this website AND some{" "}
            <Typography
              display="inline-block"
              variant="inherit"
              fontWeight="bold"
            >
              tips
            </Typography>{" "}
            about how to make your menu look the best on a mobile device.
          </Typography>

          <Typography variant="h5" textAlign="left" marginTop={4}>
            Index:
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>Tips</ListItem>
            <ListItem sx={{ display: "list-item" }}>Profile Page</ListItem>
            <ListItem sx={{ display: "list-item" }}>Upload Image</ListItem>
            <ListItem sx={{ display: "list-item" }}>Edit Menu</ListItem>
          </List>

          {/* Tips */}
          <Typography
            variant="h5"
            textAlign="left"
            fontWeight="bold"
            marginTop={2}
          >
            Tips
          </Typography>
          <Typography variant="h6" textAlign="left">
            This is a verbose guide describing each of the details of the
            Owner's Console. In case you feel like you have a good grasp of the
            website already, we'll list out all the tips you'll find in this
            guide right here.
          </Typography>
          <Typography
            variant="h6"
            textAlign="left"
            fontWeight="bold"
            marginTop={1}
          >
            Profile
          </Typography>
          <Box marginLeft={3}>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                1.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2.5}>
                The first couple lines of your restaurant description will
                appear as a smaller, grey text underneath the title of your
                restaurant in the Restaurant List Screen. This is a great place
                to market your restaurant so make the first couple lines of your
                description count!
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                2.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                Based on a given occasion, whether it be a holiday or anything
                else, you can change the hours and it will update in real time!
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                3.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                The Reset Password feature can be used when setting up a Chooz
                Menu FOR a restaurant owner who can then sign in and change
                their password
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                4.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                It is important to keep all of your restaurant profile details
                up to date
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            textAlign="left"
            fontWeight="bold"
            marginTop={1}
          >
            Upload Image
          </Typography>
          <Box display="flex" marginLeft={3}>
            <Typography variant="h6" textAlign="left">
              5.
            </Typography>
            <Typography variant="h6" textAlign="left" marginLeft={2}>
              The banner Image is a great place to put a picture of your
              establishment or a picture inside your establishment for your
              customers to get a good sense of the vibe of the restaurant.
            </Typography>
          </Box>
          <Typography
            variant="h6"
            textAlign="left"
            fontWeight="bold"
            marginTop={1}
          >
            Edit Menu
          </Typography>
          <Box marginLeft={3}>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                6.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                You can download the image of your QR Code. With this QR Code,
                you can do whatever you please. Print a big QR Code to place
                outside your establishment for curious customers to view your
                menu. Print a bunch of small QR Codes to tape to each table. QR
                Codes are instantly recognizable and can be used by the majority
                of smart phone users.
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                7.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                [In the menu column] If you only have one menu, you could make
                one menu "All" or the title of your restaurant and continue to
                create the categories underneath that menu
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" textAlign="left">
                8.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={2}>
                Utilizing each of the columns is important for a good user
                experience.
              </Typography>
            </Box>
          </Box>

          <Divider color="grey" sx={{ marginTop: 4, marginBottom: 1 }} />

          <Typography variant="h6" textAlign="left">
            On the left side of the screen, you will see 3 tabs titled: Profile,
            Upload Image, and Edit Menu. Clicking on the chooz logo on the top
            left will send you back to the homepage. To the top right of of the
            page, you'll find where you can logout.
          </Typography>

          {/* Profile */}
          <Typography
            variant="h5"
            textAlign="left"
            fontWeight="bold"
            marginTop={4}
          >
            Profile
          </Typography>
          <Typography variant="h6" textAlign="left">
            The profile screen has everything that will appear on your
            restaurant's detail screen inside the app (or at the top of the menu
            in the browser preview). Here is a quick explanation of each of the
            fields within this page and how they will be displayed to the users.
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Email Address
                </Typography>{" "}
                - This is the email address that you used to sign up with (or
                the email address that is associated with your FB account). This
                email will NOT be displayed to the users. This email also cannot
                be changed.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Owner name
                </Typography>{" "}
                - This is the name of the Owner of the Restaurant. This
                information does not appear anywhere on your menu.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Restaurant Name
                </Typography>{" "}
                - This is the name of the Restaurant on the Account. This
                information will be reflected as the title of the restaurant on
                your menu and restaurant detail page.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Description
                </Typography>{" "}
                - This is the description of your restaurant that customers will
                read on the restaurant details page.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: The first couple lines of your restaurant description will
                appear as a smaller, grey text underneath the title of your
                restaurant in the Restaurant List Screen. This is a great place
                to market your restaurant so make the first couple lines of your
                description count!
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Address
                </Typography>{" "}
                - This is the address of your restaurant.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Phone number
                </Typography>{" "}
                - This is the phone number customers will use to contact your
                restaurant.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Operating Hours
                </Typography>{" "}
                - This is the operating hours of your Restaurant.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: Based on a given occasion, whether it be a holiday or
                anything else, you can change the hours and it will update in
                real time!
              </Typography>
            </ListItem>
          </List>

          <Typography variant="h6" textAlign="left" marginTop={2}>
            Towards the bottom of the page, you'll find 2 buttons: Reset
            Password and Edit Profile.
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Reset Password
                </Typography>{" "}
                - This button will send you to a page that will give you the
                ability to send an email to the associated email address and
                that will ask you to reset your password.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: The Reset Password feature can be used when setting up a
                Chooz Menu FOR a restaurant owner who can then sign in and
                change their password
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Edit Profile
                </Typography>{" "}
                - This button allows you to change your restaurant profile
                fields that are listed above.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: It is important to keep all of your restaurant profile
                details up to date
              </Typography>
            </ListItem>
          </List>

          <Divider sx={{ marginTop: 3 }} />
          {/* Upload Image */}
          <Typography
            variant="h5"
            textAlign="left"
            fontWeight="bold"
            marginTop={1}
          >
            Upload Image
          </Typography>
          <Typography variant="h6" textAlign="left">
            The upload image page is used to upload your restaurant's Banner
            Image and Logo Image.
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Banner Image
                </Typography>{" "}
                - The banner image is what will be displayed at the top of the
                restaurant detail page of the app (or the top of the menu in the
                browser preview).
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                textAlign="left"
                marginLeft={4}
                marginTop={1}
              >
                NOTE: On the browser preview, this image will be stretched to
                fit the screen but on the App, this picture will be cropped to
                fit the screen.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: The banner Image is a great place to put a picture of your
                establishment or a picture inside your establishment for your
                customers to get a good sense of the vibe of the restaurant.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Logo Image
                </Typography>{" "}
                - This should be the logo of your restaurant. It will be
                displayed on your Restaurant Detail Screen AS WELL as the main
                image for the Restaurant List Screen.
              </Typography>
            </ListItem>
          </List>
          <Typography variant="h6" textAlign="left">
            The preview of these images on this page will update when you hit
            the UPLOAD BUTTON at the bottom of the page.
          </Typography>

          <Divider sx={{ marginTop: 3 }} />
          {/* Edit Menu */}
          <Typography
            variant="h5"
            textAlign="left"
            fontWeight="bold"
            marginTop={1}
          >
            Edit Menu
          </Typography>
          <Typography variant="h6" textAlign="left">
            Here's where all the magic happens! There are a couple features that
            this guide will help explain. This page may seem a bit intimidating
            at first but it should make complete sense after clicking around in
            it for a bit.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            marginTop={2}
          >
            Top of the page
          </Typography>
          <Typography variant="h6" textAlign="left">
            At the top of the page, you'll see the Edit Button, the title of
            your Restaurant as you assigned it in the profile page, the Access
            QR Code Button, and the Publish Button.
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Edit Button
                </Typography>{" "}
                - This is how you can edit your menu after it has been
                published. By default, your menu is unpublished so your edit
                button is already selected. When your menu is published,
                pressing the edit button will ask you to unpublish your
                restaurant before you can continue to edit. Please be sure to
                publish it after you complete your edits. (See below for what
                published and unpublished is)
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Title of your Restaurant
                </Typography>{" "}
                - Set on the Profile Page
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Access QR Code Button
                </Typography>{" "}
                - This button is how you can view and download the QR code for
                your restaurant.
                <Typography
                  display="inline"
                  variant="inherit"
                  fontWeight="bold"
                >
                  {" "}
                  This QR code will remain the SAME through the edits of your
                  menu
                </Typography>{" "}
                - so there is no need to reprint them once you have edited your
                menu
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                textAlign="left"
                marginLeft={4}
                marginTop={1}
              >
                NOTE: This QR Code is only accessible when your menu is
                published. (See below for what published and unpublished is)
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: You can download the image of your QR Code. With this QR
                Code, you can do whatever you please. Print a big QR Code to
                place outside your establishment. Print a bunch of small QR
                Codes to tape to each table. QR Codes are instantly recognizable
                and can be used by the majority of smart phone users.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                >
                  Publish Button
                </Typography>{" "}
                - Finally, you will see the publish button. What this button
                does is
                <Typography
                  display="inline"
                  variant="inherit"
                  fontWeight="bold"
                >
                  {" "}
                  publishes{" "}
                </Typography>
                your menu once you've finished it or
                <Typography
                  display="inline"
                  variant="inherit"
                  fontWeight="bold"
                >
                  {" "}
                  unpublishes{" "}
                </Typography>
                it when it is published. When you first create an account, your
                restaurant is NOT published. When you publish your menu, you
                will be asked to confirm whether you would like to publish. Once
                you confirm, you'll be shown your QR code for the restaurant!
                You do not have to scan the QR code and can just close out.
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={4}>
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Unpublished
                </Typography>{" "}
                - if your menu is unpublished, it is not accessible from the
                Restaurant List Screen within the app. In this state, you can
                edit your menu but you cannot access the QR
              </Typography>
              <Typography variant="h6" textAlign="left" marginLeft={4}>
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Published
                </Typography>{" "}
                - If your menu is published, it is accessible from the
                Restaurant List Screen within the App and you cannot edit your
                menu. In this state, you cannot edit your menu but you can
                access the QR Code.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                textAlign="left"
                marginLeft={4}
                marginTop={1}
              >
                NOTE: Whether your Restaurant is published or unpublished, users
                will still be able to view your restaurant IF they have access
                to the QR Code!
              </Typography>
            </ListItem>
          </List>

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            marginTop={2}
          >
            Columns Explained
          </Typography>
          <Typography variant="h6" textAlign="left">
            This part will guide you through the Menu, Category, Item, and Item
            Details Column. For now, there are some default values to help you
            understand the intended purpose of these columns
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Menu
                </Typography>{" "}
                - Restaurants often have multiple menus that they'd like to
                display to their customers. In the default values , for example,
                this restaurant has a breakfast menu, lunch menu, and a dinner
                menu. Other restaurants might have a Drink menu, Brunch menu,
                but you should fill these in how you see fit.
              </Typography>
              <Typography
                display="inline-block"
                variant="h6"
                fontStyle="italic"
                textAlign="left"
                marginLeft={4}
                color="grey.500"
              >
                TIP: If you only have one menu, you could make the menu "All" or
                the title of your restaurant and just continue to create the
                categories of your menu underneath that menu
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Category
                </Typography>{" "}
                - Within a menu, you can add multiple categories. In the default
                values, for example, the breakfast menu has a pancake category
                and a waffle category. Each category can have a description.
                This description is displayed underneath the category and is
                intended to describe something that applies to all the items
                within the category. The description of the category can be seen
                at the bottom of each of the items in the item detail screen.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Item
                </Typography>{" "}
                - Items are what is served from each category.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  Item Details
                </Typography>{" "}
                - Item details is the column where you can set the details of
                the item. This includes the price, description, and ingredients
                of the item. At the bottom of this column, you can also see the
                description of the category for which this item is associated
                with.
              </Typography>
            </ListItem>
          </List>

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            marginTop={2}
          >
            Navigating
          </Typography>
          <Typography variant="h6" textAlign="left">
            Selecting a menu in the Menu Column will update the Categories
            column with the categories that are within that menu. Selecting a
            Category within the category column will update the Item Column with
            the items within that category. Finally, clicking on an item will
            update the Item Details column with the details of the selected
            item.
          </Typography>
          <Typography variant="h6" textAlign="left" marginTop={2}>
            You can add a menu, category, or item by clicking on the respective
            plus symbol at the bottom of the column.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            marginTop={4}
          >
            Editing and Deleting
          </Typography>
          <Typography variant="h6" textAlign="left">
            When selecting anything within the Menu, Category, or Item columns,
            you'll see two buttons to the right of the row. The edit button - a
            pencil, and a delete button - an X. These buttons do the exact same
            thing for each column.
          </Typography>
          <Typography variant="h6" textAlign="left" marginTop={2}>
            You can add a menu, category, or item by clicking on the respective
            plus symbol at the bottom of the column.
          </Typography>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  The edit button
                </Typography>{" "}
                allows you to change the title of the Menu, Category, or Item.
                This is also the button that allows you to change the Category
                Description.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" textAlign="left">
                <Typography
                  display="inline-block"
                  variant="inherit"
                  fontWeight="bold"
                >
                  The delete button
                </Typography>{" "}
                will delete the entire item selected so BE CAREFUL! For example,
                if it is a menu, the delete button will delete the entire menu
                and its categories. If it is a category, the delete button will
                delete the entire category and the items within it. etc.
              </Typography>
            </ListItem>
          </List>
          <Typography variant="h6" textAlign="left">
            You can easily change the order of how the menus, categories, and
            items appear on your menu. Simply click and drag on a menu, category
            or item and place it in the order you'd like.
          </Typography>
          <Typography variant="h6" textAlign="left" marginTop={2}>
            Once you finish editing, be sure to publish your changes!
          </Typography>
          <Typography
            display="inline-block"
            variant="h6"
            fontStyle="italic"
            textAlign="left"
            marginLeft={4}
            color="grey.500"
          >
            TIP: Utilizing each of the columns is important for a good user
            experience.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

require("dotenv").config();
const key = process.env.MY_KEY;
const iv = process.env.MY_IV;
const express = require("express");
const axios = require("axios").default;
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const stripe = require("stripe")(process.env.STRIPE_KEY);
const cors = require('cors');
const FormData = require("form-data");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");

app.post("/create/user", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/createUser",
            {
                key: req.body.key,
                user_id: req.body.user_id,
                name: req.body.name,
                email: req.body.email,
                login_type: req.body.login_type,
                device_id: req.body.device_id,
                utm_medium: req.body.utm_medium,
                utm_source: req.body.utm_source,
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/get/user", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/getUser",
            {
                key: req.body.key,
                email: req.body.email,
                device_id: req.body.device_id,
                debug: "debug",
            }
        );
        console.log("getUserData", response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/get/main/data", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/getDatas",
            {
                key: req.body.key,
                page: req.body.page,
                count: req.body.count,
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        console.log("error: ", error);
        res.send(error);
    }
});

app.post("/get/datas", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/getCategoryDatas",
            {
                debug_key: req.body.debug_key,
                cat_id: req.body.cat_id,
                limit: req.body.limit,
                page: req.body.page,
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        res.send(error);
    }
});

app.post("/get/chat", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/getChatList",
            {
                key: req.body.key,
                user_id: req.body.user_id,
            }
        );
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        res.send(error);
    }
});
// app.post("/send/message", async (req: any, res: any) => {
//   try {
//     const response = await axios.post(
//       "https://craftyverse.in/templates/api/V3/sendMessage",
//       {
//         key: req.body.key,
//         user_id: req.body.user_id,
//         message: req.body.message,
//         width: req.body.width,
//         height: req.body.height,
//         brand: req.body.brand,
//         is_file: req.body.is_file,
//         photo_uri: req.body.photo_uri,
//       }
//     );
//     // console.log(response);
//     const originalData = decrypt(response, key);
//     res.send(originalData);
//   } catch (error) {
//     res.send(error);
//   }
// });
app.post("/update/user", upload.single("file"), async (req: any, res: any) => {
    const formData = new FormData();
    formData.append("key", req.body.key);
    formData.append("name", req.body.name);
    formData.append("user_id", req.body.user_id);
    formData.append("updateDp", req.body.updateDp);
    formData.append("photo_uri", req.file);
    console.log("req.body.photo_uri: ", req.file);
    // console.log("formData: ", formData);

    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/updateUser",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        console.log("error: ", error);
        res.status(500).send(error);
    }
});

app.post("/my-api", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/getSubs",
            {
                key: "qwfsegxdhbxfjhncf",
                user_id: "2CRyHIf28IfEsJbIuyFahj41u0P2",
                currency: "INR",
                debug: "debug",
            }
        );
        console.log(response.formData);
        console.log("drgdstgd",key);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/my-currentPlan", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V3/getCurrentPlan",
            {
                key: req.body.key,
                user_id: req.body.user_id,
            }
        );
        console.log(response.formData);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/my-posterPage", async (req: any, res: any) => {
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V4/getPosterPage",
            {
                key: req.body.key,
                id_name: req.body.id_name,
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        res.send(originalData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/search-template", async (req: any, res: any) => {
    const formData = new FormData();
    console.log("formData: ", formData);

    formData.append("key", req.body.key);
    formData.append("app_id", req.body.app_id);
    formData.append("cat_id", req.body.cat_id);
    formData.append("keywords", req.body.keywords);
    formData.append("device", req.body.device);
    formData.append("refWidth", req.body.refWidth);
    formData.append("refHeight", req.body.refHeight);
    formData.append("page", req.body.page);
    formData.append("debug", req.body.debug);
    try {
        const response = await axios.post(
            "https://craftyverse.in/templates/api/V4/searchTemplates",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        // console.log(response);
        const originalData = decrypt(response.data, key);
        console.log("originalData: ", originalData);
        res.send(originalData);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/my-payment", async (req: any, res: any) => {
    const formData = new FormData();
    formData.append("packageId", req.body.packageId);
    formData.append("packageName", req.body.packageName);
    formData.append("rate", req.body.rate);
    formData.append("currency", req.body.currency);
    formData.append("pay_mode", req.body.pay_mode);
    formData.append("fromWallet", req.body.fromWallet);
    formData.append("user_id", req.body.user_id);

    try {
        const response = await axios.post(
            "https://craftyverse.in/payment/razorpay",
            formData
        );

        console.log(response);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post("/payments/create", async (req: any, res: any) => {
    let { amount, id, currency } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: currency,
            description: "craftyart",
            payment_method: id,
            confirm: true,
            return_url: "https://craftyartapp.com",
        });
        console.log("Payment", payment);
        res.send(payment);
    } catch (error) {
        console.log("Error", error);
        res.json(error);
    }
});

app.listen(5000, () => {
    console.log(`server started at port`);
});

function decrypt(encrypted: any, key2: any) {
    console.log(key2);
    const key = Buffer.from(key2);
    const iv = randomBytes(16);
    const decipher = createDecipheriv("aes-128-cbc", key, iv);
    try {
        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error) {
        return encrypted;
    }
}

import Twitter from "twitter-lite";
require("dotenv").config();

const clientUpload = new Twitter({
    subdomain: "upload",
    consumer_key: process.env.CONSUMER_KEY as string,
    consumer_secret: process.env.CONSUMER_SECRET as string,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const clientAPI = new Twitter({
    subdomain: "api",
    consumer_key: process.env.CONSUMER_KEY as string,
    consumer_secret: process.env.CONSUMER_SECRET as string,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

class TwitterMethods {
    async uploadImage(imageInBase64: string) {
        const responseImageUpload = await clientUpload.post('media/upload', {
            media_data: imageInBase64
        });

        if (!responseImageUpload) {
            throw new Error('Error when trying to send an image on Twitter');
        }

        return responseImageUpload.media_id_string as string;
    }

    async newPost(content: string, imgId?: string) {
        try {
            await clientAPI.post("statuses/update", {
                status: content,
                media_ids: imgId
            });
        } catch (error) {
            console.error(error);
        }
    }

    async sendDm(message: string = "App error", userId: string) {
        try {
            await clientAPI.post("direct_messages/events/new", {
                event: {
                    type: "message_create",
                    message_create: {
                        target: {
                            recipient_id: userId
                        },
                        message_data: {
                            text: message
                        }
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default TwitterMethods;
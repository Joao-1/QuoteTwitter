import Twitter from "twitter-lite";
import config from "../config"

const { consumer_key, consumer_secret, access_token_key, access_token_secret } = config.twitter;

const twitterCredentials = (subdomain: "upload" | 'api') => {
    return {
        subdomain,
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret
    }
}
const clientUpload = new Twitter(twitterCredentials("upload"));
const clientAPI = new Twitter(twitterCredentials("api"));

export default class TwitterMethods {
    async uploadImage(imageInBase64: string) {
        try {
            const responseImageUpload = await clientUpload.post('media/upload', {
                media_data: imageInBase64
            });
            return responseImageUpload.media_id_string as string;
        } catch (error) {
            throw new Error('Error when trying to send an image on Twitter');
        }
    }

    async newPost(content: string, imgId?: string) {
        try {
            await clientAPI.post("statuses/update", {
                status: content,
                media_ids: imgId
            });
        } catch (error) {
            console.log(error);
            throw new Error('Could not make a new post');
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
            throw new Error('Unable to send a new message in dm');
        }
    }
}
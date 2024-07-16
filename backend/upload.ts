import multer from "multer";
import path from "path";

const FOLDER_PATH = path.join(__dirname, ".", "/temp_images");

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, FOLDER_PATH);
	},
	filename: (req, file, callback) => {
		if (req.params.conversation_id && req.cookies.decoded_uid) {
			callback(
				null,
				`${req.params.conversation_id}-${req.cookies.decoded_uid}-${file.originalname}`
			);
		} else {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	}
});

const upload = multer({ storage });

export default upload;

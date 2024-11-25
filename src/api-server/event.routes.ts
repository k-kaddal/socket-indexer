import {Router} from "express";
import {getEventById, streamEvents} from "./event.controller";

const router = Router();

router.get("/stream", streamEvents);
router.get("/:id", getEventById);

export default router;

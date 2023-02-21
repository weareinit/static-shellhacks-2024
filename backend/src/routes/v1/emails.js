import express from "express";
import { prisma, s3 } from "../../index.js";

export const router = express.Router();



// Will contain routes for emailing 

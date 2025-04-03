const Question = require("../models/question");
const fs = require("fs");
const csvParser = require("csv-parser");
const QuestionService = {
    async getPaginatedQuestions(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Question.findAndCountAll({
            offset,
            limit,
            order: [["id", "ASC"]],
        });

        return {
            questions: rows,
            total: count,
            page,
            limit,
        };
    },
    // 🟢 Lấy tất cả câu hỏi
    async getAllQuestions() {
        return await Question.findAll();
    },


    async getAllCountQuestion() {
        return await Question.count();
    },

    // 🟢 Lấy câu hỏi theo ID
    async getQuestionById(id) {
        return await Question.findByPk(id);
    },

    // 🟢 Lấy danh sách câu hỏi theo part_id
    async getQuestionsByPart(part_id) {
        return await Question.findAll({ where: { part_id } });
    },

    // 🟢 Tạo câu hỏi mới
    async createQuestion(data) {
        return await Question.create(data);
    },

    // 🟢 Cập nhật câu hỏi theo ID
    async updateQuestion(id, data) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.update(data);
        return question;
    },

    // 🔴 Xóa câu hỏi theo ID
    async deleteQuestion(id) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.destroy();
        return question;
    },

    // 🟢 Cập nhật ảnh cho câu hỏi
    async updateQuestionImage(id, image_filename) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.update({ image_filename });
        return question;
    },
    // 🟢 Import câu hỏi từ file CSV
    async importQuestionsFromCSV(filePath) {
        const questions = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("data", (row) => {
                    // mapping từ CSV sang model
                    const mapped = {
                        exam_id: Number(row.exam_id),
                        part_id: Number(row.part_id),
                        question_text: row.question_text,
                        option_a: row.option_a,
                        option_b: row.option_b,
                        option_c: row.option_c,
                        option_d: row.option_d || null,
                        correct_answer: row.correct_answer,
                        order: row.order ? Number(row.order) : null,
                    };
                    questions.push(mapped);
                })
                .on("end", async () => {
                    try {
                        const created = await Question.bulkCreate(questions);
                        resolve(created);
                    } catch (err) {
                        reject(err);
                    }
                })
                .on("error", (err) => reject(err));
        });
    }
};

module.exports = QuestionService;

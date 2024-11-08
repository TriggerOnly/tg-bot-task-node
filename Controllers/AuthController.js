import UserModel from '../Models/User.js'
import jwt from "jsonwebtoken"

export const Auth = async (req, res) => {
    try {
        const { tgId, maxScore } = req.body;

        const userCreated = await UserModel.findOne({ tgId });

        // login
        if (userCreated) {
            const token = jwt.sign(
                { _id: userCreated._id },  
                'secret123', 
                { expiresIn: '5d' }
            );
            
            return res.json({ token, user: userCreated });
        }

        // register
        if (!userCreated) {
            const doc = new UserModel({
                tgId,
                maxScore
            });
            
            const user = await doc.save();
            
            const token = jwt.sign(
                { _id: user._id },  
                'secret123', 
                { expiresIn: '5d' }
            );
            
            return res.json({ user, token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ошибка авторизации"
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Токен не предоставлен"
            });
        }

        const decoded = jwt.verify(token, 'secret123');
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ошибка авторизации"
        });
    }
};

export const Record = async (req, res) => {
    try {
        const {maxScore} = req.body
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: "Токен не предоставлен"
            });
        }

        const decoded = jwt.verify(token, 'secret123')
        const userId = decoded._id

        const scoreUpdate = await UserModel.findByIdAndUpdate(
            userId,
            {maxScore},
            { new: 'true' }
        )

        if(!scoreUpdate) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        res.json({
            message: "Вы поставили новый рекорд!",
            scoreUpdate
        })
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            message: "Не удалось получить данные о пользователе"
        })
    }
}
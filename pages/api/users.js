import { Task, User } from '../../database/models';
import logger from '../../services/logger';
import nc from 'next-connect';


export default nc({
	onError(error, req, res) {
		res.status(404).json({ msg: `Something went wrong ${error}` });
	},
	onNoMatch(req, res) {
		res.status(404).json({ error: `Method not allowed` });
	}
})
	.get(async (req, res) => {
		try {
			const users = await User.findAll({
				attributes: ['first_name', 'last_name', 'email'],
				include: 'tasks',
				limit: 100,
			});
			res.status(200).json({ users });
		} catch (e) {
			logger.error(e.stack);
			res.status(400).json({
				error_code: 'get_users',
				message: e.message,
			});

		}
	})
	.post(async (req, res) => {
		try {
			const { first_name, last_name, email } = req.body;
			console.log(first_name, last_name, email)
			const user = await User.create({
				"first_name": first_name,
				"last_name": last_name,
				"email": email
			})
			if (!user) {
				return `User not created`
			}
			res.status(201).json(user);
		} catch (error) {
			res.status(501).json(error);
		}
	})
	.put(async (req, res) => {
		try {
			const {id} = req.query
			console.log("id", id)
			const {first_name, last_name,email} = req.body
			const user = await User.findOne({ where: { id } });
			if (user) {
				user.first_name = first_name;
				user.last_name = last_name;
				user.email = email;

				await user.save();
				console.log('User updated successfully!');
				res.status(201).json({"data":user, msg:"User updated successfully!"});

			} else {
				res.status(404).json('User not found.');
			}
		} catch (error) {

		}
	})
	.delete(async (req, res)=>{
		const {id}=req.query
		try {
				User.destroy({ where: { id } });
				res.status(200).json('User deleted.');
		} catch (error) {
			console.log(error)
		}
	})

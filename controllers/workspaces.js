const Workspace = require("../models/Workspace").model;

exports.getWorkspace = (req, res) => {
	Workspace.findById(req.auth.workspace)
		.then((workspace) => {
			if (workspace !== null) return res.status(200).json(workspace);
			//Status code 404  (Not Found)
			res.status(404).json({
				message: "Workspace Not Found",
			});
		})
		.catch((err) => {
			//Status code 400 (Bad Request)
			res.status(400).json({
				message: "Bad request not valid id",
				err,
			});
		});
};

exports.deleteWorkspace = (req, res) => {
	return Workspace.deleteOne({ _id: req.auth.workspace })
		.then((result) => {
			if (result.deletedCount > 0)
				return res
					.status(200)
					.json({
						message: "Workspace Deleted!",
					})

			res.status(404).json({
				message: "Workspace Not Found",
			});
		})
};
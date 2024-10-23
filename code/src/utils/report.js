import * as model from "../models/models"

const getReport = async (idToFetch) => {
    const records = await model.Project.findAll({ 
        include: {

                model: model.HistoryDonations,
                where: { ProjectId: idToFetch },
                include: { 
                    model: model.Donater,
                    include: {
                        model: model.User
                    }
                }
        },

        where: {
            id: idToFetch,
        }
    })

    return records
}

export default getReport

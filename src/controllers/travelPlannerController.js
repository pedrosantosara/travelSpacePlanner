const express = require('express')
const router = express.Router()
const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


exports.createTravelPlan = async (req, res) => {
  try {
    const {travelStops } = req.body;

    const newTravelPlan = await prisma.travelPlanner.create({
      data: {
        travelStops
      }
    });
    res.status(201).json(newTravelPlan);
  } catch (e) {
  console.error(e);
  res.status(500).json({error: 'Erro ao criar um novo plano de viagem'});
  } 
}


exports.getAllTravelPlans = async (req, res) => {
  try {
    const allTravelPlans = await prisma.travelPlanner.findMany()
    if(allTravelPlans.length === 0){
      res.status(404).json({error: 'Nenhum plano de viagem encontrado'})
    }else{
      res.json(allTravelPlans)
    }
  } catch (error) {
    res.status(500).json({error: 'Erro ao buscar os planos de viagem'})
  }
}


exports.getTravelPlansById = async (req, res) => {
  try {
    const {id} = req.params
    const travelPlansid = await prisma.travelPlanner.findUnique({
      where: {
        id: Number(id)
      }
    })
    if(travelPlansid === null){
      throw new Error()
    } 
    res.json(travelPlansid)
  } catch (error) {
    res.status(404).json({error: 'Erro Viagem não encontrada'})
  }
}


exports.updateTravelPlan = async (req, res) => {
  try {
    const {id} = req.params
    const {travelStops} = req.body
    const updatedTravelPlan = await prisma.travelPlanner.update({
      where: { 
        id: Number(id)
      },
      data: {
        travelStops
      }
    })
    res.json(updatedTravelPlan)
  } catch (error) {
    res.status(500).json({error:'Erro ao atualizar o plano de viagem'})
  }
}

exports.deleteTravelPlan = async (req, res) => {
  try {
    const {id} = req.params
    const deleteTravelPlan = await prisma.travelPlanner.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deleteTravelPlan)
  } catch (error) {
    res.status(500).json({error: 'Erro ao deletar o plano de viagem'})
  }
}
// vou usar 

//exports.getTravelPlanById = async (req, res) => {
//  try {
//    const {id} = req.params
//    const data = await axios.get(`https://rickandmortyapi.com/api/location/${id}`).then (response => response.data)
//    res.json(data)
//  } catch (error) {
//    res.status(404).json({error: 'Erro ao buscar o plano de viagem'})
//  }
//}
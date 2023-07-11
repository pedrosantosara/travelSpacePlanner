const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// metodo Post 
exports.createTravelPlan = async (req, res) => {
  try {
    const { travelStops } = req.body;

    const newTravelPlan = await prisma.travelPlanner.create({
      data: {
        travelStops,
      },
    });
    res.status(201).json(newTravelPlan);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao criar um novo plano de viagem" });
  }
};

// metodo Get All e expand == true
exports.getAllTravelPlans = async (req, res) => {
  try {
    const { expand } = req.query;
    let allTravelPlans = await prisma.travelPlanner.findMany();

    if (allTravelPlans.length === 0) {
      res.status(404).json({ error: "Nenhum plano de viagem encontrado" });
    } 

    if (expand === "true"){
      allTravelPlans = await Promise.all(allTravelPlans.map(async (plan) => {
        const stopDetails = await Promise.all(plan.travelStops.map((idParada) =>
          axios.get(`https://rickandmortyapi.com/api/location/${idParada}`)
        ));

        const stopsData = stopDetails.map((response) => {
          const {id, name, type, dimension} = response.data;
          return {id, name, type, dimension};
        });

        plan.travelStops = stopsData;

        return plan;
      }));
    }
    res.json(allTravelPlans)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os planos de viagem" });
  }
}

//metodo Get by id e expand == true

exports.getTravelPlansById = async (req, res) => {
  try {
    const { id } = req.params;
    const { expand } = req.query;

    let travelPlan;
    travelPlan = await prisma.travelPlanner.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (travelPlan === null) {
      throw new Error();
    }

    if (expand === "true") {
      const travelStopsExpand = travelPlan.travelStops.map((idParada) =>
        axios.get(`https://rickandmortyapi.com/api/location/${idParada}`)
      );

      const stopDetails = await Promise.all(travelStopsExpand);
      const stopsData = stopDetails.map((response) => {
        const { id, name, type, dimension } = response.data;
        return { id, name, type, dimension };
      });

      travelPlan.travelStops = stopsData;
    }
    res.json(travelPlan);
  } catch (error) {
    res.status(404).json({ error: "Erro Viagem não encontrada" });
  }
};

//metodo put  
exports.updateTravelPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { travelStops } = req.body;
    const updatedTravelPlan = await prisma.travelPlanner.update({
      where: {
        id: Number(id),
      },
      data: {
        travelStops,
      },
    });
    res.json(updatedTravelPlan);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao atualizar o plano de viagem" });
  }
};

//metodo delete
exports.deleteTravelPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTravelPlan = await prisma.travelPlanner.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteTravelPlan);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o plano de viagem" });
  }
};

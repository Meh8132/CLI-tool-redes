#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
require('dotenv').config();
const {OpenAI} = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function analizarCodigo(archivo) {
  try {
    const codigo = fs.readFileSync(archivo, 'utf8');

    const prompt = `Analiza el siguiente código y detecta vulnerabilidades de seguridad:\n\n${codigo}\n\n` +
                   "Proporciona una lista detallada de problemas encontrados y recomendaciones de solución.";

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: "Debes analizar vulnerabilidades de seguridad en el código fuente."
            },
            {
                role: 'user',
                content: prompt
            }
        ],
    });

    const resultado = response.choices[0].message.content;
    console.log("Análisis de vulnerabilidades de seguridad:");
    console.log(resultado);

  } catch (error) {
    console.error("Error al analizar el código:", error.message);
  }
}

program
  .version('1.0.0')
  .description('CLI para analizar vulnerabilidades de seguridad en el código fuente usando OpenAI')
  .argument('<archivo>', 'Ruta del archivo de código fuente a analizar')
  .action(analizarCodigo);

program.parse(process.argv);

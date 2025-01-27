#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
require('dotenv').config();
const OpenAI = require('openai');

const program = new Command();

// Configuración de la CLI
program
  .version('1.0.0')
  .description('Herramienta de análisis de vulnerabilidades en código')
  .requiredOption('-f, --file <path>', 'Ruta al archivo de código a analizar')
  .parse(process.argv);

// Validar y cargar configuración
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: Falta la clave de API de OpenAI en el archivo .env');
  process.exit(1);
}

// Función principal de análisis
async function analyzeCode(filePath) {
  try {
    // Validar archivo
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      throw new Error('El archivo especificado no existe o no es válido');
    }

    // Leer código fuente
    const codeContent = fs.readFileSync(filePath, 'utf-8');

    // Preparar prompt para OpenAI
    const prompt = `Eres un experto en seguridad de código. Analiza el siguiente código en busca de vulnerabilidades:
    
${codeContent}

Proporciona:
1. Lista de vulnerabilidades encontradas con severidad (Alta, Media, Baja)
2. Descripción técnica de cada vulnerabilidad
3. Números de línea afectados
4. Recomendaciones de mitigación
5. Si no se encuentran vulnerabilidades, indica "No se encontraron vulnerabilidades críticas"`;

    // Enviar solicitud a OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Eres un analizador de seguridad de código especializado en detectar vulnerabilidades.'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.3
    });

    // Mostrar resultados
    console.log('\n🔍 Análisis de seguridad:\n');
    console.log(response.choices[0].message.content);
    console.log('\n');

  } catch (error) {
    console.error(`❌ Error durante el análisis: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar análisis
analyzeCode(program.opts().file);
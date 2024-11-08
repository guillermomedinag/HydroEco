import { File } from "lucide-react";
import { useState } from "react";

export interface Report {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ReportSelectorProps {
  onReportSelect: (report: Report) => void;
}

const reportTypes = [
  {
    id: 1,
    name: "Informe Hidrológico Básico",
    description: "Análisis de caudales y régimen hidrológico",
    price: 149990,
  },
  {
    id: 2,
    name: "Estudio de Calidad del Agua",
    description: "Análisis físico-químico y biológico completo",
    price: 199990,
  },
  {
    id: 3,
    name: "Evaluación de Riesgo Hídrico",
    description: "Análisis de riesgos y vulnerabilidad",
    price: 299990,
  },
];

const ReportSelector = ({ onReportSelect }: ReportSelectorProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    onReportSelect(report);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <File className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Seleccione tipo de informe</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedReport?.id === report.id
                ? "border-river-500 bg-river-50"
                : "border-gray-200 hover:border-river-500"
            }`}
            onClick={() => handleReportSelect(report)}
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-river-600">
              {report.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <p className="text-river-600 font-bold">
              ${report.price.toLocaleString("es-CL")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSelector;
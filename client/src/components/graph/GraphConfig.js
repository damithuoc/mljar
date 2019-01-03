import * as React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes

export const UPLOAD_TYPE = "upload";
export const DATAFRAME_TYPE = "dataframe";
export const COLUMNS_SELECTION_TYPE = "columns_selection";
export const MLEXPERIMENT_TYPE = "mlexperiment";
export const SELECTED_MLMODEL_TYPE = "selected_mlmodel";

export const EDGE_TYPE = "edge";

export const nodeTypes = [
  UPLOAD_TYPE,
  DATAFRAME_TYPE,
  COLUMNS_SELECTION_TYPE,
  MLEXPERIMENT_TYPE,
  SELECTED_MLMODEL_TYPE
];
export const edgeTypes = [EDGE_TYPE];

const RectShape = id => (
  <symbol viewBox="0 0 94 94" id={id} width="94" height="94">
    <rect width="94" height="94" />
  </symbol>
);

const EdgeShape = <symbol viewBox="0 0 0 0" id="edge" />;

export default {
  EdgeTypes: {
    edge: {
      shape: EdgeShape,
      shapeId: "#edge"
    }
  },
  NodeSubtypes: {},
  NodeTypes: {
    upload: {
      shape: RectShape("upload"),
      shapeId: "#upload",
      typeText: "\uf093"
    },
    dataframe: {
      shape: RectShape("dataframe"),
      shapeId: "#dataframe",
      typeText: "\uf00a"
    },
    columns_selection: {
      shape: RectShape("columns_selection"),
      shapeId: "#columns_selection",
      typeText: "\uf03a"
    },
    mlexperiment: {
      shape: RectShape("mlexperiment"),
      shapeId: "#mlexperiment",
      typeText: "\uf0c3"
    },
    selected_mlmodel: {
      shape: RectShape("selected_mlmodel"),
      shapeId: "#selected_mlmodel",
      typeText: "\uf005"
    }
  }
};

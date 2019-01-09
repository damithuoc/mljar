import * as React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";

import { GraphView, type INodeType as INode } from "react-digraph";
import GraphConfig, {
  NODE_KEY,
  EDGE_TYPE,
  UPLOAD_TYPE,
  DATAFRAME_TYPE,
  COLUMNS_SELECTION_TYPE,
  MLEXPERIMENT_TYPE,
  SELECTED_MLMODEL_TYPE
} from "./GraphConfig";

import { selectNode } from "./GraphActions.js";

const sample = {
  edges: [
    {
      handleText: "Read data",
      source: "a1",
      target: "a2",
      type: EDGE_TYPE
    },
    {
      handleText: "Select ML columns",
      source: "a2",
      target: "a3",
      type: EDGE_TYPE
    },
    {
      handleText: "Run ML Experiment",
      source: "a3",
      target: "a4",
      type: EDGE_TYPE
    },
    {
      handleText: "Best ML Model",
      source: "a4",
      target: "a5",
      type: EDGE_TYPE
    }
  ],
  nodes: [
    {
      id: "a1",
      title: "File upload",
      type: UPLOAD_TYPE,
      x: 0,
      y: 0,
      data: { msg: "more" }
    },
    {
      id: "a2",
      title: "DataFrame",
      type: DATAFRAME_TYPE,
      x: 240,
      y: 0
    },
    {
      id: "a3",
      title: "Columns selection",
      type: COLUMNS_SELECTION_TYPE,
      x: 480,
      y: 0
    },
    {
      id: "a4",
      title: "ML Experiment",
      type: MLEXPERIMENT_TYPE,
      x: 720,
      y: 0
    },
    {
      id: "a5",
      title: "Selected model",
      type: SELECTED_MLMODEL_TYPE,
      x: 800,
      y: 110
    }
  ]
};

class Graph extends React.Component {
  GraphView;

  constructor(props) {
    super(props);

    this.state = {
      copiedNode: null,
      graph: sample,
      selected: null,
      totalNodes: sample.nodes.length
    };

    this.GraphView = React.createRef();
  }

  componentDidMount() {
    console.log("did mount");
  }

  // Helper to find the index of a given node
  getNodeIndex(searchNode: INode | any) {
    return this.state.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  onUpdateNode = (viewNode: INode) => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph });
  };

  // Node 'mouseUp' handler
  onSelectNode = viewNode => {
    // Deselect events will send Null viewNode
    this.setState({ selected: viewNode });
    if (!isEmpty(viewNode)) {
      console.log("select node" + viewNode);
      this.props.selectNode(viewNode);
    }
  };

  render() {
    const { nodes, edges } = this.state.graph;
    const selected = this.state.selected;
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

    return (
      <div id="graph">
        <GraphView
          ref={el => (this.GraphView = el)}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          gridSpacing={12}
          gridDotSize={0.6}
          edgeArrowSize={2.5}
          edgeHandleSize={0.1}
          canDeleteNode={false}
          canDeleteEdge={false}
          canCreateEdge={false}
          onSelectNode={this.onSelectNode}
          onUpdateNode={this.onUpdateNode}
        />
      </div>
    );
  }
}

//export default Graph;

Graph.propTypes = {
  //getGraphData: PropTypes.func.isRequired,
  //updateGraphData: PropTypes.func.isRequired,
  selectNode: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { selectNode }
)(withRouter(Graph));

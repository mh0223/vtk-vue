import Constants from "vtk.js/Sources/Rendering/Core/ImageMapper/Constants";
import vtkFullScreenRenderWindow from "vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow";
import vtkImageMapper from "vtk.js/Sources/Rendering/Core/ImageMapper";
import vtkImageSlice from "vtk.js/Sources/Rendering/Core/ImageSlice";
import vtkInteractorStyleImage from "vtk.js/Sources/Interaction/Style/InteractorStyleImage";
import vtkXMLImageDataReader from "vtk.js/Sources/IO/XML/XMLImageDataReader";

export default {
  name: "VtkView",
  mounted() {
    const { SlicingMode } = Constants;

    // ----------------------------------------------------------------------------
    // Standard rendering code setup
    // ----------------------------------------------------------------------------

    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    // ----------------------------------------------------------------------------
    // Example code
    // ----------------------------------------------------------------------------

    const mapper = vtkImageMapper.newInstance();
    mapper.setSliceAtFocalPoint(true);
    mapper.setSlicingMode(SlicingMode.Z);

    const reader = vtkXMLImageDataReader.newInstance();
    reader
      .setUrl("https://kitware.github.io/vtk-js-datasets/data/vti/LIDC2.vti")
      .then(() => {
        mapper.setInputConnection(reader.getOutputPort());
        renderer.addActor(actor);

        const camera = renderer.getActiveCamera();
        const position = camera.getFocalPoint();
        // offset along the slicing axis
        const normal = mapper.getSlicingModeNormal();
        position[0] += normal[0];
        position[1] += normal[1];
        position[2] += normal[2];
        camera.setPosition(...position);
        switch (mapper.getSlicingMode()) {
          case SlicingMode.X:
            camera.setViewUp([0, 1, 0]);
            break;
          case SlicingMode.Y:
            camera.setViewUp([1, 0, 0]);
            break;
          case SlicingMode.Z:
            camera.setViewUp([0, 1, 0]);
            break;
          default:
        }
        camera.setParallelProjection(true);
        renderer.resetCamera();
        renderWindow.render();
      });

    const actor = vtkImageSlice.newInstance();
    actor.getProperty().setColorWindow(255);
    actor.getProperty().setColorLevel(127);
    actor.setMapper(mapper);

    const iStyle = vtkInteractorStyleImage.newInstance();
    renderWindow.getInteractor().setInteractorStyle(iStyle);
  }
};

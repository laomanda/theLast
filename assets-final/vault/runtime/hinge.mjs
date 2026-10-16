/**
 * Apply a measured world-space hinge axis to a GLTF-loaded Door_Hinge_Pivot.
 * This deliberately avoids pivot.rotation.z: Blender's authored Z-up rotation
 * axis does not survive this exporter as the pivot node's runtime local +Z.
 * The adapter owns visual transforms only; it does not commit semantic state.
 */
export function createWorldAxisHingeAdapter(THREE, pivot, measuredWorldAxis, sign = 1) {
  if (!THREE || !pivot || !measuredWorldAxis) throw new TypeError('THREE, pivot, and measuredWorldAxis are required');
  pivot.updateWorldMatrix(true, false);
  const parent = pivot.parent;
  const parentScale = parent.getWorldScale(new THREE.Vector3());
  const uniform = Math.max(parentScale.x, parentScale.y, parentScale.z) - Math.min(parentScale.x, parentScale.y, parentScale.z) < 1e-5;
  if (!uniform) throw new Error('World-axis hinge adapter requires a uniformly scaled parent');

  const axisWorld = measuredWorldAxis.clone().normalize();
  const axisParent = axisWorld.clone().transformDirection(parent.matrixWorld.clone().invert()).normalize();
  const neutralLocalQuaternion = pivot.quaternion.clone();
  const setAngleDegrees = degrees => {
    const delta = new THREE.Quaternion().setFromAxisAngle(axisParent, THREE.MathUtils.degToRad(sign * degrees));
    pivot.quaternion.copy(delta.multiply(neutralLocalQuaternion));
    pivot.updateWorldMatrix(true, true);
  };
  const reset = () => {
    pivot.quaternion.copy(neutralLocalQuaternion);
    pivot.updateWorldMatrix(true, true);
  };
  return { axisWorld, axisParent, setAngleDegrees, reset };
}

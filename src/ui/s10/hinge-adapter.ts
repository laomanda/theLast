import * as THREE from "three";

/** Apply the measured world-space hinge axis to the authored Vault pivot. */
export function createWorldAxisHingeAdapter(
  pivot: THREE.Object3D,
  measuredWorldAxis: THREE.Vector3,
  sign = 1,
) {
  if (!pivot || !measuredWorldAxis) throw new TypeError("pivot and measuredWorldAxis are required");
  pivot.updateWorldMatrix(true, false);
  const parent = pivot.parent;
  if (!parent) throw new Error("World-axis hinge adapter requires a parent");
  const parentScale = parent.getWorldScale(new THREE.Vector3());
  const uniform = Math.max(parentScale.x, parentScale.y, parentScale.z) - Math.min(parentScale.x, parentScale.y, parentScale.z) < 1e-5;
  if (!uniform) throw new Error("World-axis hinge adapter requires a uniformly scaled parent");

  const axisWorld = measuredWorldAxis.clone().normalize();
  const axisParent = axisWorld.clone().transformDirection(parent.matrixWorld.clone().invert()).normalize();
  const neutralLocalQuaternion = pivot.quaternion.clone();
  const setAngleDegrees = (degrees: number) => {
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

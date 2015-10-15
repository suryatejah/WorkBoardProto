/**
 * 
 */
package org.onosproject.provider.adtran.device.impl;

import static org.junit.Assert.assertEquals;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.onosproject.cfg.ComponentConfigAdapter;
import org.onosproject.cluster.ClusterServiceAdapter;
import org.onosproject.net.DeviceId;
import org.onosproject.net.MastershipRole;
import org.onosproject.net.SparseAnnotations;
import org.onosproject.net.device.DeviceDescription;
import org.onosproject.net.device.DeviceProvider;
import org.onosproject.net.device.DeviceProviderRegistry;
import org.onosproject.net.device.DeviceProviderService;
import org.onosproject.net.device.DeviceServiceAdapter;
import org.onosproject.net.device.PortDescription;
import org.onosproject.net.device.PortStatistics;
import org.onosproject.net.provider.AbstractProvider;
import org.onosproject.net.provider.AbstractProviderService;
import org.onosproject.net.provider.ProviderId;
import org.osgi.service.component.ComponentContext;

import com.adtran.common.models.device.DeviceDiscoveryInfo;
import com.adtran.common.models.device.PortInfo;
import com.adtran.common.models.device.PortInfo.PortType;
import com.adtran.common.models.device.SlotInfo;
import com.adtran.firefly.messaging.RequestMessage;
import com.adtran.firefly.messaging.RequestMessage.RequestMethod;

/**
 * @author cmahipat
 * Set of tests of Device Discovery
 *
 */
public class AdtranDeviceProviderTest {

	private ComponentContext context;
	private AdtranDeviceProvider adtranDeviceProvider;
	private DeviceProviderService deviceProviderService;
	private static final ProviderId PID = new ProviderId("adtran", "foo");

	@Before
	public void setup() {
		adtranDeviceProvider = new AdtranDeviceProvider();
		adtranDeviceProvider.cfgService = new ComponentConfigAdapter();
		deviceProviderService = new TestDeviceProviderService(new TestDeviceProvider());
		adtranDeviceProvider.providerRegistry = new TestProviderRegistry();
		adtranDeviceProvider.deviceService = new DeviceServiceAdapter();
		adtranDeviceProvider.clusterService = new ClusterServiceAdapter();
		adtranDeviceProvider.activate(context);
	}

	@After
	public void tearDown() {
		adtranDeviceProvider.deactivate(context);
	}

	@Test
	public void testDiscover() {
		
		DeviceDiscoveryInfo deviceInfo = new DeviceDiscoveryInfo();
		deviceInfo.setDescription("SCM");
		deviceInfo.setIpAddress("10.5.221.29");
		deviceInfo.setSysname("TA5K-SHELF29");
		deviceInfo.setName("1187010L1");
		
		LinkedList<SlotInfo> slots = new LinkedList<SlotInfo>();
		LinkedList<PortInfo> ports = new LinkedList<PortInfo>();
		
		SlotInfo slotInfo = new SlotInfo();
		slotInfo.setDescription("TA50001187502F1");
		slotInfo.setSerialNumber("LBADTN1235AG703");
		slotInfo.setSlotNumber(14);
		
		slots.add(slotInfo);
		
		PortInfo gigPortInfo = new PortInfo();
		gigPortInfo.setNum(2);
		gigPortInfo.setType(PortType.gigabit_ethernet);
		ports.add(gigPortInfo);
		
		PortInfo gponPortInfo = new PortInfo();
		gponPortInfo.setNum(4);
		gponPortInfo.setType(PortType.gpon);
		ports.add(gponPortInfo);
		
		PortInfo backplanePortInfo = new PortInfo();
		backplanePortInfo.setNum(1);
		backplanePortInfo.setType(PortType.backplane);
		ports.add(backplanePortInfo);
		
		PortInfo fxsPortInfo = new PortInfo();
		fxsPortInfo.setNum(4);
		fxsPortInfo.setType(PortType.fxs);
		ports.add(fxsPortInfo);
		
		PortInfo rfVideoPortInfo = new PortInfo();
		rfVideoPortInfo.setNum(3);
		rfVideoPortInfo.setType(PortType.rf_video);
		ports.add(rfVideoPortInfo);
		
		PortInfo vdslPortInfo = new PortInfo();
		vdslPortInfo.setNum(2);
		vdslPortInfo.setType(PortType.vdsl);
		ports.add(vdslPortInfo);
		
		PortInfo vgigPortInfo = new PortInfo();
		vgigPortInfo.setNum(3);
		vgigPortInfo.setType(PortType.virtual_gigabit_ethernet);
		ports.add(vgigPortInfo);
		
		RequestMethod method = RequestMethod.NOTIFY;
		String resourceURI = "/device-announcement";
		Map<String, String> headerFields = new TreeMap<String, String>();
		String content = "{ip_address:10.5.221.29,devicedb_id:11,uuid:09bf989f-5b24-47bc-871f-e824d4f4c611,sysname:TA5K-SHELF29,product_id:749,serial_number:LBADTN0615AA354,name:1187010L1,description:SCM,slots:[{slot_number:14,part_number:1187502F1,description:TA50001187502F1,product_id:0,serial_number:LBADTN1235AG703,ports:[{type:gigabit-ethernet,num:2},{type:backplane,num:1},{type:fxs,num:4},{type:rf-video,num:3},{type:vdsl,num:2},{type:virtual-gigabit-ethernet,num:3},{type:gpon,num:4}]}]}";
		RequestMessage requestMessage = new RequestMessage(method, resourceURI, headerFields, content);
		adtranDeviceProvider.onMessage(requestMessage);
		
		Map<DeviceId, DeviceDescription> parsedDeviceInfo = ((TestDeviceProviderService) deviceProviderService).getDeviceDescInfo();
		DeviceDescription deviceDescription = parsedDeviceInfo.get(DeviceId.deviceId("adtran:TA5K-SHELF29_slot14"));
		SparseAnnotations annotations = deviceDescription.annotations();
		
		/*Map<DeviceId, List<PortDescription>> parsedPortInfoMap = ((TestDeviceProviderService) deviceProviderService).getPortDescInfo();
		List<PortDescription> portsDescriptionList = parsedPortInfoMap.get(DeviceId.deviceId("adtran:TA5K-SHELF29_slot14"));*/
		
		assertEquals(deviceInfo.getSysname(), annotations.value("sysname")); // Assert System name
		assertEquals(slotInfo.getDescription(), annotations.value("description")); // Assert slot level description
		assertEquals(slotInfo.getSerialNumber(), deviceDescription.serialNumber()); // Assert slot level serial number
		assertEquals(slotInfo.getSlotNumber().intValue(), Integer.parseInt(annotations.value("slot"))); // Assert slot number
		assertEquals(gigPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getGigabitPortCount()); // Assert number of giga-bit ports
		assertEquals(gponPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getGponPortCount()); // Assert number of gpon ports
		assertEquals(backplanePortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getBackplanePortCount()); // Assert number of backplane ports
		assertEquals(fxsPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getFxsPortCount()); // Assert number of fxs ports
		assertEquals(rfVideoPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getRfVideoPortCount()); // Assert number of rf-video ports
		assertEquals(vdslPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getVdslPortCount()); // Assert number of vdsl ports
		assertEquals(vgigPortInfo.getNum(), ((TestDeviceProviderService) deviceProviderService).getVgigPortCount()); // Assert number of virtual-giga-bit ports
		
	}

	/**
	 * Mocks the DeviceProviderService
	 *
	 */
	private class TestDeviceProviderService extends AbstractProviderService<DeviceProvider> implements DeviceProviderService {
		
		private Map<DeviceId, DeviceDescription> deviceDescInfo = new HashMap<DeviceId, DeviceDescription>();
//		private Map<DeviceId, List<PortDescription>> portDescInfo = new HashMap<DeviceId, List<PortDescription>>();
		private Integer gigabitPortCount = 0;
		private Integer gponPortCount = 0;
		private Integer backplanePortCount = 0;
		private Integer fxsPortCount = 0;
		private Integer rfVideoPortCount = 0;
		private Integer vdslPortCount = 0;
		private Integer vgigPortCount = 0;

		/**
		 * @param provider
		 */
		protected TestDeviceProviderService(DeviceProvider provider) {
			super(provider);
		}

		@Override
		public void deviceConnected(DeviceId deviceId,
				DeviceDescription deviceDescription) {
			
			deviceDescInfo.put(deviceId, deviceDescription);
		}

		@Override
		public void deviceDisconnected(DeviceId deviceId) {

		}

		@Override
		public void updatePorts(DeviceId deviceId,
				List<PortDescription> portDescriptions) {

//			portDescInfo.put(deviceId, portDescriptions);

			for(PortDescription portDescription : portDescriptions) {
				if(portDescription.annotations().value("portName").equals("ONT One-gigabit")) {
					gigabitPortCount++;

				} else if(portDescription.annotations().value("portName").equals("Backplane")) {
					backplanePortCount++;

				} else if(portDescription.annotations().value("portName").equals("GPON")) {
					gponPortCount++;

				} else if(portDescription.annotations().value("portName").equals("FXS")) {
					fxsPortCount++;

				} else if(portDescription.annotations().value("portName").equals("RF-Video")) {
					rfVideoPortCount++;

				} else if(portDescription.annotations().value("portName").equals("VDSL")) {
					vdslPortCount++;

				} else if(portDescription.annotations().value("portName").equals("Virtual-gigabit-ethernet")) {
					vgigPortCount++;

				}
			}

		}

		@Override
		public void portStatusChanged(DeviceId deviceId,
				PortDescription portDescription) {

		}

		@Override
		public void receivedRoleReply(DeviceId deviceId,
				MastershipRole requested, MastershipRole response) {

		}

		@Override
		public void updatePortStatistics(DeviceId deviceId,
				Collection<PortStatistics> portStatistics) {

		}
		
		/**
		 * @return the portDescInfo
		 *//*
		public Map<DeviceId, List<PortDescription>> getPortDescInfo() {
			return portDescInfo;
		}

		*//**
		 * @param portDescInfo the portDescInfo to set
		 *//*
		public void setPortDescInfo(Map<DeviceId, List<PortDescription>> portDescInfo) {
			this.portDescInfo = portDescInfo;
		}*/

		/**
		 * @return the deviceDescInfo
		 */
		public Map<DeviceId, DeviceDescription> getDeviceDescInfo() {
			return deviceDescInfo;
		}

		/**
		 * @param deviceDescInfo the deviceDescInfo to set
		 */
		public void setDeviceDescInfo(Map<DeviceId, DeviceDescription> deviceDescInfo) {
			this.deviceDescInfo = deviceDescInfo;
		}
		
		/**
		 * @return the gigabitPortCount
		 */
		public Integer getGigabitPortCount() {
			return gigabitPortCount;
		}

		/**
		 * @param gigabitPortCount the gigabitPortCount to set
		 */
		public void setGigabitPortCount(Integer gigabitPortCount) {
			this.gigabitPortCount = gigabitPortCount;
		}

		/**
		 * @return the gponPortCount
		 */
		public Integer getGponPortCount() {
			return gponPortCount;
		}

		/**
		 * @param gponPortCount the gponPortCount to set
		 */
		public void setGponPortCount(Integer gponPortCount) {
			this.gponPortCount = gponPortCount;
		}

		/**
		 * @return the backplanePortCount
		 */
		public Integer getBackplanePortCount() {
			return backplanePortCount;
		}

		/**
		 * @param backplanePortCount the backplanePortCount to set
		 */
		public void setBackplanePortCount(Integer backplanePortCount) {
			this.backplanePortCount = backplanePortCount;
		}

		/**
		 * @return the fxsPortCount
		 */
		public Integer getFxsPortCount() {
			return fxsPortCount;
		}

		/**
		 * @param fxsPortCount the fxsPortCount to set
		 */
		public void setFxsPortCount(Integer fxsPortCount) {
			this.fxsPortCount = fxsPortCount;
		}

		/**
		 * @return the rfVideoPortCount
		 */
		public Integer getRfVideoPortCount() {
			return rfVideoPortCount;
		}

		/**
		 * @param rfVideoPortCount the rfVideoPortCount to set
		 */
		public void setRfVideoPortCount(Integer rfVideoPortCount) {
			this.rfVideoPortCount = rfVideoPortCount;
		}

		/**
		 * @return the vdslPortCount
		 */
		public Integer getVdslPortCount() {
			return vdslPortCount;
		}

		/**
		 * @param vdslPortCount the vdslPortCount to set
		 */
		public void setVdslPortCount(Integer vdslPortCount) {
			this.vdslPortCount = vdslPortCount;
		}

		/**
		 * @return the vgigPortCount
		 */
		public Integer getVgigPortCount() {
			return vgigPortCount;
		}

		/**
		 * @param vgigPortCount the vgigPortCount to set
		 */
		public void setVgigPortCount(Integer vgigPortCount) {
			this.vgigPortCount = vgigPortCount;
		}

	}


	/**
	 * Mocks the DeviceProvider
	 *
	 */
	private static class TestDeviceProvider extends AbstractProvider
	implements DeviceProvider {

		/**
		 * @param id
		 */
		protected TestDeviceProvider() {
			super(PID);
		}

		@Override
		public ProviderId id() {
			return PID;
		}

		@Override
		public void triggerProbe(DeviceId deviceId) {

		}

		@Override
		public void roleChanged(DeviceId deviceId, MastershipRole newRole) {

		}

		@Override
		public boolean isReachable(DeviceId deviceId) {
			return true;
		}

	}

	/**
	 * Mocks the DeviceProviderRegistry
	 *
	 */
	private class TestProviderRegistry implements DeviceProviderRegistry {

		@Override
		public DeviceProviderService register(DeviceProvider provider) {
			return deviceProviderService;
		}

		@Override
		public void unregister(DeviceProvider provider) {

		}

		@Override
		public Set<ProviderId> getProviders() {
			return null;
		}

	}

}

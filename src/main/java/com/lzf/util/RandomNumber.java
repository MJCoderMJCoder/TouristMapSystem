/**
 * 
 */
package com.lzf.util;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.math3.random.RandomDataGenerator;

/**
 * @author MJCoder
 *
 *         随机数生成
 */
public class RandomNumber {

	/**
	 * 生成无边界的Int
	 * 
	 * @return
	 * @throws Exception
	 */
	public static int generateIntUnbounded() throws Exception {
		return new Random().nextInt();
	}

	/**
	 * 生成有边界的Int
	 * 
	 * @param min
	 * @param max
	 * @return
	 * @throws Exception
	 */
	public static int generateIntBounded(int min, int max) throws Exception {
		// return (min + ((int) (new Random().nextFloat() * (max - min)))); //包含1而不包含10
		// return ThreadLocalRandom.current().nextInt(min, max); // 包含1而不包含10
		return new RandomDataGenerator().nextInt(min, max); // 包含1且包含10
	}

	/**
	 * 生成无边界的Long
	 * 
	 * 因为Random类使用的是48bits，所以nextLong不能返回所有可能的long值，long是64bits。
	 * 
	 * @return
	 * @throws Exception
	 */
	public static long generateLongUnbounded() throws Exception {
		return new Random().nextLong();
	}

	public static long generateLongBounded(long min, long max) throws Exception {
		// return min + (((long) (new Random().nextDouble() * (max - min))));
		// return ThreadLocalRandom.current().nextLong(min, max);
		return new RandomDataGenerator().nextLong(min, max);
	}

	/**
	 * 生成0.0-1.0之间的Float随机数：只会生成包含0.0而不包括1.0的float类型随机数
	 * 
	 * @return
	 * @throws Exception
	 */
	public static float generateFloat0To1() throws Exception {
		return new Random().nextFloat();
	}

	/**
	 * 生成有边界的Float随机数
	 * 
	 * @param min
	 * @param max
	 * @return
	 * @throws Exception
	 */
	public static float generateFloatBounded(float min, float max) throws Exception {
		// float randomFloat = new
		// RandomDataGenerator().getRandomGenerator().nextFloat();
		// return min + randomFloat * (max - min);
		return min + new Random().nextFloat() * (max - min);
	}

	/**
	 * 生成0.0d-1.0d之间的Double随机数：会生成包含0.0d而不包含1.0d的随机数
	 * 
	 * @return
	 * @throws Exception
	 */
	public static double generateDouble0To1() throws Exception {
		return new Random().nextDouble();
	}

	/**
	 * 生成有边界的Double随机数
	 * 
	 * @param min
	 * @param max
	 * @return
	 * @throws Exception
	 */
	public static double generateDoubleBounded(double min, double max) throws Exception {
		// double boundedDouble = new
		// RandomDataGenerator().getRandomGenerator().nextDouble();
		// return min + boundedDouble * (max - min);
		// return min + new Random().nextDouble() * (max - min);
		return ThreadLocalRandom.current().nextDouble(min, max);
	}

}
